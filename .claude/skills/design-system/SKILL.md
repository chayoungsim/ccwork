---
name: design-system
description: >-
  이 프로젝트의 UI 스타일 작업(색상, 배경, 테두리, 그림자, 글꼴, 간격, 버튼·카드·입력·태그 칩 같은
  컴포넌트 모양, Tailwind 클래스, @theme 토큰)을 하거나 디자인을 점검할 때 사용한다.
  "스타일 바꿔줘", "디자인 시스템대로", "버튼 디자인", "카드 스타일", "색상 토큰", "디자인 리뷰"
  같은 요청에서 docs/design-system/ 문서를 필요한 것만 골라 읽도록 안내한다.
---

# 디자인 시스템 적용 워크플로우

기준 문서는 `docs/design-system/`이다. 한꺼번에 다 읽지 말고 작업에 필요한 문서만 읽는다.

## 1. 작업에 맞는 문서 고르기

| 작업                            | 읽을 문서 (순서대로)               |
| ------------------------------- | ---------------------------------- |
| 색상, 배경, 구분선              | `02-color.md` → `04-elevation.md`  |
| 글꼴, 글자 크기, 한글 표시      | `03-typography.md`                 |
| 그림자, 깊이, 테두리            | `04-elevation.md`                  |
| 새 컴포넌트, 컴포넌트 모양 수정 | `05-components.md` → `02-color.md` |
| 기존 코드를 시스템에 맞추기     | `07-migration.md` → `08-tokens.md` |
| 방향 판단이 필요할 때           | `01-principles.md`                 |

경로는 모두 `docs/design-system/` 아래이고, 인덱스는 `docs/design-system/DESIGN.md`이다.

## 2. 구현할 때

- 토큰만 쓴다. 필요한 토큰이 `src/index.css`의 `@theme`에 없으면 임의 값을 만들지 말고 사용자에게 알린다.
- 원본 명세에 값이 없는 항목(`error_container`, `primary_fixed`, `on-tertiary_fixed`, `surface_variant`)은 임의로 정하지 않는다.
- 구분은 선이 아니라 서피스 색 차이와 간격으로 한다. 경계가 꼭 필요하면 Ghost Border만 쓴다.
- 요청 범위 밖의 기존 코드를 규칙에 맞춘다는 이유로 고치지 않는다. 기존 코드와 충돌하면 차이를 알리고 방향을 확인한다.
- 한글이 들어가는 텍스트는 Pretendard fallback이 유지되는지 확인한다.

## 3. 마무리

1. `docs/design-system/06-do-dont.md`의 Do / Don't로 변경한 코드를 대조한다.
2. 변경이 크거나 여러 컴포넌트에 걸치면 `design-reviewer` 에이전트에 검토를 맡긴다.
3. 편집 직후 위반 감지 hook의 피드백이 오면 의도된 예외인지 판단하고, 아니면 고친다.
4. 구현으로 차이가 해소되면 `07-migration.md`, `08-tokens.md`의 상태를 함께 갱신한다.
