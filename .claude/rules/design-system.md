---
paths:
  - 'src/**/*.tsx'
  - 'src/**/*.css'
---

# 디자인 시스템 핵심 규칙

스타일을 만들거나 고칠 때 아래 규칙을 따른다. 세부 내용은 `docs/design-system/DESIGN.md`(인덱스)에서 필요한 문서만 골라 읽는다.

## 절대 규칙

- **No-Line**: 1px 실선 테두리로 섹션을 나누지 않는다. 경계는 서피스 배경색 차이(`surface` → `surface-container-low` → `surface-container-lowest`)로 만든다.
- **Zero-Divider**: `<hr>`, `border-bottom` 구분선을 쓰지 않는다. 목록 항목은 간격(`8`/`10`)으로 구분한다.
- **그림자**: 순수 검정(`rgba(0,0,0,…)`)을 쓰지 않는다. 꼭 필요할 때만 `on-surface`(`#191c21`) 틴트, blur `32px`, 불투명도 `6%`.
- **Ghost Border**: 접근성상 경계가 필요할 때만 `outline-variant`(`#c2c6d4`) 15% 불투명도.
- **임의 값 금지**: 컴포넌트에 hex, radius, shadow를 직접 쓰지 않는다. 토큰만 쓴다. 필요한 토큰이 `src/index.css`의 `@theme`에 없으면 임의로 만들지 말고 알린다.
- **서체**: 한 화면에 타입 스케일 3단계 초과 금지. 한글은 Pretendard fallback을 유지한다.
- **버튼**: Primary는 `primary` → `primary_container` 그라디언트 + `full` 라운드, Secondary는 테두리 없음.
- **태그/카테고리**: Curator Badge(`tertiary_fixed` 배경, `full` 라운드 칩).

## 기존 코드와의 관계

- 현재 코드는 이 시스템과 다른 부분이 많다(`border-border`, `rounded-2xl`, `shadow-[...]`, 회색 토큰 등). 기록은 `docs/design-system/07-migration.md`에 있다.
- 새로 쓰거나 수정하는 코드는 이 규칙을 따른다. **요청 범위 밖의 기존 코드를 규칙에 맞춘다는 이유로 고치지 않는다.**
- 문서와 기존 코드가 충돌하면 임의로 고치지 말고 차이를 알린 뒤 방향을 확인한다.
- 작업을 마치기 전 `docs/design-system/06-do-dont.md`로 최종 대조한다.
