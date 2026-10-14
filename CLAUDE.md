# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 목적

React 19 + TypeScript + Vite로 만든 **노트 앱 실습(강의용) 프로젝트**. 노트 CRUD만 있는 최소 코드베이스에
강의를 따라 기능을 단계적으로 추가하는 것이 전제다. (예: `src/types/note.ts`의 `tags` 필드는 "강의에서 추가할 것")
백엔드는 `json-server`가 `db.json`을 REST API로 노출하는 mock 구조다.

## 명령어

```bash
npm run dev          # Vite(5173) + json-server(3001) 동시 실행 — API 서버 없이는 목록 로딩이 실패함
npm run server       # json-server만 단독 실행
npm run build        # tsc 타입 체크 후 vite build
npm run lint         # eslint . --fix  ← 자동 수정까지 수행하므로 파일이 바뀔 수 있음
npm run format       # prettier --write .
npm test             # vitest run / npm run test:watch: 워치 모드
npx vitest run src/components/NoteItem.test.tsx   # 단일 파일 (예시 경로)
npx vitest run -t "테스트 이름"                     # 이름으로 필터
```

- `npm install` 시 `prepare` 스크립트가 husky hook을 설치한다
- `/mermaid-diagram` 스킬: src/ 구조를 `docs/architecture/index.html`로 시각화 (`docs/`는 gitignore된 생성물)

## 기술 스택 / 구조

- React 19, TypeScript 5 (strict, `noUnusedLocals`/`noUnusedParameters`), Vite 6
- Tailwind CSS v4 — `@tailwindcss/vite` 방식, **`tailwind.config.js` 없음**, 토큰은 `src/index.css`의 `@theme`
- Vitest 3 + jsdom + Testing Library (설정은 `vite.config.ts`의 `test` 블록, `globals: true`)
- Prettier: 세미콜론, 작은따옴표, 2칸, trailing comma `all`, `printWidth: 100`

```
src/
├── App.tsx                   # NotesProvider 래핑 + UI 선택 상태
├── api/notes.ts              # fetch 기반 REST 함수
├── context/NotesContext.tsx  # 노트 전역 상태 + useNotes 훅
├── components/               # Layout, NoteList, NoteItem, NoteEditor
└── types/note.ts             # Note 인터페이스
```

## 컴포넌트 구현 패턴

- `export function Xxx({ a, b }: XxxProps)` — **named export + 시그니처에서 props 구조분해**. (`App`만 default export)
- Props 타입은 같은 파일 상단에 `interface XxxProps`로 선언 (`type` 별칭 미사용)
- 레이아웃 합성은 `ReactNode` 슬롯 props로 (`Layout`의 `sidebar`/`main`)
- 상태 분기는 **early return**: `loading` → `error` → 빈 목록 → 정상 렌더 순서 (`NoteList`, `NoteEditor`)
- 리스트는 `map` + `key={item.id}`, 래퍼가 필요 없으면 Fragment `<>` 사용
- JSX 영역 구분 주석은 `{/* 헤더 */}`처럼 한국어로
- 카드 안 버튼은 `e.stopPropagation()`으로 카드 클릭과 분리
- 스타일은 Tailwind 유틸리티를 `className`에 직접 작성, 조건부 클래스는 템플릿 리터럴 + 삼항
- 색상은 `@theme` 토큰 클래스(`bg-card`, `text-muted-foreground`, `border-border`, `text-destructive` 등) 사용

## 상태 관리 방식

- **서버 데이터는 Context 하나(`NotesContext`)에 집중**: `notes`, `loading`, `error` + 변경 함수 3개
- Context 기본값은 `null`, 커스텀 훅 `useNotes()`가 null이면 에러를 던지는 가드 패턴
- 컴포넌트는 `api/`를 직접 호출하지 않고 반드시 `useNotes()`를 거친다
- **비관적 업데이트**: API 성공 후 응답값으로 state 갱신, 갱신은 항상 함수형 `setNotes((prev) => ...)`
  - 추가 `[...prev, x]` / 수정 `prev.map(...)` / 삭제 `prev.filter(...)`
- **UI 상태는 `App.tsx`에 lift-up**: `selectedNoteId`, `isCreating`을 props로 내려준다
- 폼 입력값은 컴포넌트 로컬 state(`NoteEditor`의 `title`/`content`), `useEffect`로 선택 노트와 동기화
  - 의존성을 `[selectedNoteId, isCreating]`로 의도적으로 제한 (`eslint-disable-line` 처리됨)
- 외부 상태 라이브러리(Redux, Zustand, React Query 등) 미사용

## API 호출 패턴 (`src/api/notes.ts`)

- 리소스별 파일에 `export async function` + 명시적 반환 타입 `Promise<Note>`
- 공통 흐름: `fetch` → `if (!res.ok) throw new Error('...')` → `return res.json()`
- 생성 입력 타입은 `Omit<Note, 'id' | 'createdAt' | 'updatedAt'>`, 수정은 `Partial<Note>` + `PATCH`
- `createdAt`/`updatedAt`은 **클라이언트에서** `new Date().toISOString()`으로 생성
- `id`는 json-server가 생성(시드는 `"1"`, 신규는 랜덤 문자열) → 항상 `string`으로 취급
- 베이스 URL은 `const API_URL = 'http://localhost:3001'` 하드코딩 (환경 변수 없음)
- Context에서는 `import * as api from '../api/notes'` 네임스페이스 import로 사용

## 네이밍 패턴

| 대상               | 규칙                                  | 예시                                                   |
| ------------------ | ------------------------------------- | ------------------------------------------------------ |
| 컴포넌트 파일/이름 | PascalCase, 도메인 접두사 `Note`      | `NoteList.tsx`, `NoteItem`                             |
| 기타 파일          | camelCase                             | `api/notes.ts`, `types/note.ts`                        |
| 콜백 props         | `on` + 동사                           | `onSelect`, `onDelete`, `onNewNote`, `onDone`          |
| 내부 핸들러        | `handle` + 동사(+명사)                | `handleSave`, `handleSelectNote`                       |
| API 함수           | HTTP 의미 동사                        | `fetchNotes`, `createNote`, `updateNote`, `deleteNote` |
| Context 액션       | UI 의미 동사                          | `addNote`, `editNote`, `removeNote`                    |
| Context/훅         | `XxxContext`, `XxxProvider`, `useXxx` | `NotesProvider`, `useNotes`                            |
| ID props           | `selectedXxxId`                       | `selectedNoteId`                                       |

API 함수와 Context 액션의 동사를 일부러 다르게 쓰므로 새 기능도 이 구분을 따른다.

## ⚠️ 일관성 없는 패턴 (수정 시 통일 방향 확인 필요)

1. **boolean 이름**: `isCreating`, `isSelected`는 `is` 접두사, `loading`, `saving`은 접두사 없음
2. **비동기 문법**: `api/`와 핸들러는 `async/await`, `NotesContext` 초기 로딩만 `.then().catch().finally()` 체인
3. **에러 처리 위치**: 초기 로딩 에러는 Context `error`에 저장 / 저장 에러는 `NoteEditor`가 `try/catch` + `alert`
   / **삭제(`removeNote`)는 아무도 catch하지 않음** → 실패 시 unhandled rejection
4. **에러 메시지 언어**: API는 영어(`'Failed to fetch notes'`), UI는 한국어 → `NoteList`에 `오류: Failed to...`처럼 섞여 표시
5. **이벤트 핸들러 위치**: `App`/`NoteEditor`는 `handleXxx` 함수 선언, `NoteItem` 삭제는 JSX 인라인 화살표 함수
6. **import 스타일**: Context만 `import * as api` 네임스페이스, 나머지는 named import.
   타입(`Note`, `ReactNode`)도 `import type` 없이 일반 import
7. **파일명 단/복수**: `api/notes.ts`(복수) vs `types/note.ts`(단수)
8. **폰트 지정**: `--font-display` 토큰이 있는데 `Layout`은 `style={{ fontFamily: 'Boogaloo, sans-serif' }}` 인라인
9. **인라인 style 혼용**: 대부분 Tailwind인데 `Layout` 높이만 `style={{ height: 'calc(100vh - 65px)' }}`
10. **radius/shadow**: `--radius` 토큰은 미사용, `rounded-xl/2xl/3xl`과 `shadow-[...]` 임의값이 컴포넌트마다 제각각
11. **버튼 스타일 중복**: 같은 primary 버튼 클래스가 `Layout`과 `NoteEditor`에 복붙됨 (공통 `Button` 컴포넌트 없음)
12. **Context value 미메모이제이션**: value 객체와 함수가 매 렌더 새로 생성 (`useMemo`/`useCallback` 없음)

## 커밋 규칙 (husky hook으로 강제됨)

- **pre-commit**: lint-staged가 staged 파일만 처리 — `ts/tsx`는 `eslint --fix` → `prettier --write`,
  `css/md/html/json`은 `prettier --write`. 수정분은 커밋에 자동 포함, ESLint 에러가 남으면 커밋 중단
- **commit-msg**: commitlint(`commitlint.config.mjs`, Conventional Commits)가 `type: 제목` 형식 검사
  - 허용 type: `feat` `fix` `docs` `style` `refactor` `test` `chore` `perf` `build` `ci` `revert`
  - 첫 커밋의 `init`은 허용되지 않는 type이므로 사용 금지
  - 제목은 한글. `subject-case`는 한글 제목 오탐 때문에 비활성화되어 있음
- hook 실패 시 `--no-verify`로 우회하지 말고 원인(린트 에러, 메시지 형식)을 고친다
- 브랜치는 `feature/기능명`, `fix/버그명`. 커밋은 작은 단위로 나눈다

## 테스트 / 주의사항

- **현재 테스트 파일 없음.** 추가 시 대상 옆에 `*.test.tsx`. `NotesContext`가 `fetch`를 직접 호출하므로 `fetch` 모킹 필요
- `npm run dev` 중 CRUD를 하면 **`db.json`이 실제로 변경**됨 → 의도한 시드 변경이 아니면 커밋 금지
- 반응형 미흡: 사이드바 `w-72` 고정, 모바일 레이아웃 없음
- 접근성 미흡: `NoteItem`이 클릭 가능한 `div`(키보드 접근 불가), 입력 필드에 `label` 없음, 삭제 확인 없음
