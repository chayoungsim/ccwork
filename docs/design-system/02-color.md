> ← [디자인 시스템 인덱스](DESIGN.md)

## 2. 색상 & 서피스

팔레트는 깊고 신뢰감 있는 블루(`primary: #00478d`)와 세련된 틸(`tertiary: #005151`)을 중심으로 하며, 넉넉한 화이트 스페이스와 균형을 이룬다.

### 2.1 컬러 토큰

| 토큰                       | 값        | 용도                                         |
| -------------------------- | --------- | -------------------------------------------- |
| `primary`                  | `#00478d` | 주요 CTA, 링크, 포커스 Ghost Border          |
| `primary_container`        | `#005eb8` | Primary 그라디언트의 끝 색                   |
| `tertiary`                 | `#005151` | 보조 강조(틸)                                |
| `tertiary_fixed`           | `#93f2f2` | Curator Badge 배경                           |
| `surface`                  | `#f9f9ff` | 기본 배경(Base Layer)                        |
| `surface-container-low`    | `#f2f3fb` | 보조 콘텐츠 영역                             |
| `surface-container-lowest` | `#ffffff` | 우선순위 높은 인터랙티브 카드                |
| `surface-container-high`   | `#e7e8f0` | 중첩 유틸리티(코드 스니펫, 검색창, 보조버튼) |
| `on-surface`               | `#191c21` | 본문 텍스트, 그림자 틴트 색                  |
| `outline-variant`          | `#c2c6d4` | Ghost Border (불투명도 15%)                  |
| `error`                    | `#ba1a1a` | 에러 helper 텍스트                           |

> `error_container`, `primary_fixed`, `on-tertiary_fixed`, `surface_variant`의 구체적인 hex 값은 원본 명세에 없다.
> 값이 필요한 작업을 할 때는 임의로 정하지 말고 확인한다.

### 2.2 "No-Line" 규칙 (필수)

**1px 실선 테두리로 섹션을 구분하지 않는다.** 경계는 배경색의 변화로만 만든다.

- 예: `surface` 히어로 영역 → `surface-container-low` 기능 섹션으로 바로 전환한다.
  "무게"의 변화만으로 충분한 시각적 구분이 되며, 선의 잡음이 없다.

### 2.3 서피스 계층과 중첩

UI를 물리적인 레이어의 쌓임으로 다룬다. `surface-container` 단계로 중요도를 정의한다.

| 레이어              | 토큰                       | 설명                                         |
| ------------------- | -------------------------- | -------------------------------------------- |
| Base Layer          | `surface`                  | `#f9f9ff`                                    |
| Secondary Content   | `surface-container-low`    | `#f2f3fb`                                    |
| High-Priority Cards | `surface-container-lowest` | `#ffffff`, 어두운 베이스 위에서 "떠 보임"    |
| Embedded Utilities  | `surface-container-high`   | `#e7e8f0`, 코드 스니펫/검색창 같은 중첩 요소 |

### 2.4 "Glass & Gradient" 규칙

"테크 포워드" 느낌을 위해 주요 CTA와 히어로 배경에는 은은한 선형 그라디언트를 쓴다.

- **Primary Gradient**: `primary` (`#00478d`) → `primary_container` (`#005eb8`). 저가형 시스템의 평평함을 막고 깊이를 준다.
- **Glassmorphism**: 떠 있는 내비게이션/모달 오버레이는 `surface` 70% 불투명도 + `20px` backdrop-blur.
  브랜드 컬러가 부드럽게 비쳐 요소가 환경에 녹아든다.
