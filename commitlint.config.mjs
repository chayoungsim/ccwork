// 커밋 메시지 규칙: Conventional Commits (type: 제목)
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 한글 제목이 영문 고유명사(README, CLAUDE.md 등)로 시작하면 오탐하므로 비활성화
    'subject-case': [0],
  },
};
