# 디자인 시스템: The Architectural Perspective

> 출처: Stitch가 제공한 노트 앱 디자인 시스템 명세
> **스타일/UI 작업(색상, 타이포, 간격, 컴포넌트 모양) 전에는 반드시 이 인덱스에서 필요한 문서를 골라 읽고 따른다.**

문서는 주제별로 나뉘어 있다. 작업에 필요한 문서만 읽는다.

## 문서 목록

| 문서                                 | 내용                                                       | 이럴 때 읽는다                       |
| ------------------------------------ | ---------------------------------------------------------- | ------------------------------------ |
| [01-principles.md](01-principles.md) | Creative North Star "The Digital Curator", 철학            | 디자인 방향을 판단해야 할 때         |
| [02-color.md](02-color.md)           | 컬러 토큰, No-Line 규칙, 서피스 계층, Glass & Gradient     | 색상/배경/구분선을 다룰 때           |
| [03-typography.md](03-typography.md) | Manrope/Inter 스케일, 위계 규칙, 한글 fallback             | 글꼴/글자 크기/굵기를 다룰 때        |
| [04-elevation.md](04-elevation.md)   | Tonal Layering, Ambient Shadow, Ghost Border               | 그림자/깊이/테두리를 다룰 때         |
| [05-components.md](05-components.md) | Button, Card & List, Input, Curator Badge, Feature Overlay | 컴포넌트 모양을 만들거나 고칠 때     |
| [06-do-dont.md](06-do-dont.md)       | **Do / Don't 체크리스트**                                  | **모든 스타일 작업의 마지막 점검**   |
| [07-migration.md](07-migration.md)   | 현재 코드와의 차이 (기록용, 작업 진행에 따라 갱신)         | 기존 코드를 이 시스템에 맞게 바꿀 때 |
| [08-tokens.md](08-tokens.md)         | Tailwind v4 `@theme` 토큰 매핑 제안                        | 토큰을 `src/index.css`에 옮길 때     |

## 읽는 순서 가이드

- **모든 작업**: `06-do-dont.md`는 항상 마지막에 대조한다.
- **색상·배경·카드**: `02-color.md` → `04-elevation.md` → `05-components.md`
- **글꼴·텍스트**: `03-typography.md`
- **새 컴포넌트**: `05-components.md` → `02-color.md` → `06-do-dont.md`
- **토큰/리팩터링**: `07-migration.md` → `08-tokens.md`

## 문서 관리 규칙

- 이 폴더가 디자인 시스템의 **단일 기준**이다. 기존 코드와 충돌하면 임의로 고치지 말고 차이를 알린 뒤 방향을 확인한다.
- 원본 명세에 없는 값(예: `error_container`의 hex)은 임의로 정하지 않고 확인한다.
- 구현이 진행되면 `07-migration.md`와 `08-tokens.md`의 상태를 함께 갱신한다.
