// PostToolUse hook: 새로 쓴 코드가 디자인 시스템(docs/design-system)을 어기는지 검사한다.
// - 수정된 내용(new_string / content)만 검사하므로 기존 레거시 코드에는 반응하지 않는다.
// - 위반 후보가 있으면 stderr에 요약을 쓰고 exit 2로 종료해 Claude에게 피드백을 전달한다.
//   (PostToolUse는 이미 실행된 뒤라 차단하지 않는다. 경고 용도)

const MAX_FINDINGS = 8;

// 검사 대상: src 아래 tsx, css
const TARGET_PATH = /(^|\/)src\/.*\.(tsx|css)$/;

// border 계열 중 허용하는 토큰 (실선이 아닌 것, Ghost Border)
const BORDER_ALLOWED =
  /^border(-[trblxy])?-(none|0|transparent|collapse|separate|spacing|solid|dashed|dotted|opacity)|outline-variant/;

const rules = [
  {
    id: 'no-line',
    doc: '02-color.md (No-Line), 04-elevation.md (Ghost Border)',
    message:
      '실선 테두리 사용. 경계는 서피스 색 차이로 표현한다 (필요하면 outline-variant 15% Ghost Border)',
    exts: ['tsx'],
    find: (line) => {
      // Ghost Border(outline-variant)가 있는 줄은 허용
      if (line.includes('outline-variant')) return [];
      const tokens =
        line.match(/(?<![\w-])border(?:-[trblxy])?(?:-[\w/.%[\]#-]+)?(?![\w-])/g) ?? [];
      return tokens.filter((t) => !BORDER_ALLOWED.test(t));
    },
  },
  {
    id: 'divider',
    doc: '05-components.md (Zero-Divider)',
    message: '구분선 사용(<hr>, divide-*). 항목 구분은 간격(8/10)으로 한다',
    exts: ['tsx'],
    find: (line) => line.match(/<hr\b|(?<![\w-])divide-[\w-]+/g) ?? [],
  },
  {
    id: 'black-shadow',
    doc: '04-elevation.md (Ambient Shadow)',
    message: '순수 검정 그림자. on-surface(#191c21) 틴트, blur 32px, 불투명도 6%를 쓴다',
    exts: ['tsx', 'css'],
    find: (line) =>
      line.match(/rgba?\(\s*0\s*,\s*0\s*,\s*0|shadow-black|(?<![\w-])#000(?:000)?\b/g) ?? [],
  },
  {
    id: 'arbitrary-value',
    doc: '06-do-dont.md (임의 값 금지)',
    message: '임의 shadow/radius 값. 문서의 토큰만 쓴다 (카드 rounded-xl, 버튼 rounded-full)',
    exts: ['tsx'],
    find: (line) =>
      line.match(
        /(?<![\w-])(?:shadow|rounded)-\[[^\]]*\]|(?<![\w-])rounded-(?:2xl|3xl)(?![\w-])/g,
      ) ?? [],
  },
  {
    id: 'hex-color',
    doc: '06-do-dont.md (임의 값 금지), 08-tokens.md',
    message: '컴포넌트에 hex 색상 직접 사용. @theme 토큰을 쓴다',
    exts: ['tsx'],
    find: (line) =>
      line.match(/#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/g) ?? [],
  },
  {
    id: 'inline-style',
    doc: '07-migration.md (인라인 style)',
    message: '인라인 style 사용. 토큰 기반 클래스로 표현한다',
    exts: ['tsx'],
    find: (line) => line.match(/style=\{\{/g) ?? [],
  },
];

// 입력(JSON)에서 검사할 새 코드를 뽑는다
function collectNewContent(toolName, toolInput) {
  if (!toolInput) return '';
  if (toolName === 'Write') return toolInput.content ?? '';
  if (toolName === 'Edit') return toolInput.new_string ?? '';
  if (toolName === 'MultiEdit') {
    return (toolInput.edits ?? []).map((e) => e.new_string ?? '').join('\n');
  }
  return '';
}

function main(raw) {
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return 0; // 입력을 해석하지 못하면 조용히 통과
  }

  const filePath = String(payload.tool_input?.file_path ?? '').replace(/\\/g, '/');
  if (!TARGET_PATH.test(filePath)) return 0;

  const ext = filePath.endsWith('.css') ? 'css' : 'tsx';
  const content = collectNewContent(payload.tool_name, payload.tool_input);
  if (!content) return 0;

  const findings = [];
  content.split('\n').forEach((line, index) => {
    for (const rule of rules) {
      if (!rule.exts.includes(ext)) continue;
      for (const hit of rule.find(line)) {
        findings.push({ rule, hit, lineNo: index + 1 });
      }
    }
  });

  if (findings.length === 0) return 0;

  const shown = findings.slice(0, MAX_FINDINGS);
  const lines = [
    `[디자인 시스템] ${filePath} 에서 위반 후보 ${findings.length}건 (수정한 코드 기준, 줄 번호는 수정 내용 안에서의 위치)`,
    ...shown.map((f) => `- ${f.lineNo}행 \`${f.hit}\` — ${f.rule.message} [${f.rule.doc}]`),
  ];
  if (findings.length > shown.length)
    lines.push(`- 그 외 ${findings.length - shown.length}건 생략`);
  lines.push(
    '의도한 예외가 아니면 docs/design-system/ 규칙에 맞게 고친다. 기존 코드와 충돌하거나 필요한 토큰이 없으면 임의로 정하지 말고 사용자에게 확인한다.',
  );

  process.stderr.write(lines.join('\n') + '\n');
  return 2;
}

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => (input += chunk));
process.stdin.on('end', () => process.exit(main(input)));
