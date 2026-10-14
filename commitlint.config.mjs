// 커밋 메시지 규칙: Conventional Commits (type: 제목)
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 허용 타입 엄격하게 제한
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'chore', 'test', 'refactor', 'style', 'ci']],

    // 제목 50자 이하
    'subject-max-length': [2, 'always', 50],

    // 제목 소문자 강제
    'subject-case': [2, 'always', 'lower-case'],

    // 마침표 금지
    'subject-full-stop': [2, 'never', '.'],
  },
};
