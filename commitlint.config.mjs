// 커밋 메시지 규칙: Conventional Commits (type: 제목)
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 허용 타입 엄격하게 제한
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'perf',
        'build',
        'ci',
        'revert',
      ],
    ],

    // 제목 50자 이하
    'subject-max-length': [2, 'always', 50],

    // 한글 제목 오탐 때문에 비활성화
    'subject-case': [0],

    // 마침표 금지
    'subject-full-stop': [2, 'never', '.'],
  },
};
