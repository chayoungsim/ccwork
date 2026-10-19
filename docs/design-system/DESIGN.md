# 디자인 시스템: The Architectural Perspective

> 출처: Stitch가 제공한 노트 앱 디자인 시스템 명세
> **스타일/UI 작업(색상, 타이포, 간격, 컴포넌트 모양) 전에는 반드시 이 문서를 먼저 읽고 따른다.**

## 목차

1. [개요 / Creative North Star](#1-개요--creative-north-star)
2. [색상 & 서피스](#2-색상--서피스)
3. [타이포그래피](#3-타이포그래피)
4. [Elevation & Depth](#4-elevation--depth)
5. [컴포넌트 규칙](#5-컴포넌트-규칙)
6. [Do / Don't](#6-do--dont)
7. [현재 코드와의 차이 (마이그레이션 메모)](#7-현재-코드와의-차이-마이그레이션-메모)
8. [Tailwind v4 토큰 매핑 가이드](#8-tailwind-v4-토큰-매핑-가이드)

---

## 1. 개요 / Creative North Star

### "The Digital Curator"

이 디자인 시스템은 "템플릿 우선" 사고방식을 거부한다.
화면을 박스의 모음이 아니라 **에디토리얼 갤러리**처럼 다룬다.

- 묵직한 **Manrope** 디스플레이 서체와 기능적인 **Inter** 본문 서체의 대비로 권위 있으면서도 친근한 분위기를 만든다.
- 경직된 대칭 그리드를 깨기 위해 의도적인 여백(간격 토큰 `16`, `24`)과 겹침(overlap)을 사용해 움직임과 기술적 세련미를 준다.
- 구조선(border) 대신 **톤의 깊이(tonal depth)** 로 시선을 안내한다.

---

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

---

## 3. 타이포그래피

### Editorial Authority

개성과 극단적인 가독성의 균형을 위해 두 가지 서체를 쓴다.

| 역할           | 서체        | 스케일                                    | 사용처                                            |
| -------------- | ----------- | ----------------------------------------- | ------------------------------------------------- |
| Display & Head | **Manrope** | `display-lg`, `headline-lg`, `display-sm` | 가치 제안, 섹션 헤더. Bold가 안정감을 전달        |
| Body & Label   | **Inter**   | `body-lg` (1rem), `label-md`              | 모든 기능 텍스트. `label-md`는 섹션 도입 오버라인 |

- `display-sm`은 섹션 헤더에 써서 "에디토리얼" 위계를 유지한다.
- `label-md`는 **오버라인 전용**: 대문자, 자간 `0.05em`.
- `body-lg`(1rem)가 가독성의 표준이다.

### 위계 규칙

- **한 화면에 3단계를 초과하는 타입 스케일을 쓰지 않는다.**
- `display-md` (2.75rem)와 `body-lg` (1rem)를 직접 대비시켜 세련되고 대비 강한 리듬을 만든다.

### 프로젝트 적용 노트 (한글 fallback)

Manrope와 Inter에는 **한글 글리프가 없다.** 이 앱은 한국어 UI이므로 다음 폰트 스택을 따른다.

```css
/* Display / Headline */
font-family: 'Manrope', 'Pretendard Variable', system-ui, sans-serif;

/* Body / Label */
font-family: 'Inter', 'Pretendard Variable', system-ui, sans-serif;
```

- 영문/숫자는 Manrope·Inter로, 한글은 자동으로 Pretendard로 렌더링된다.
- Pretendard는 `index.html`에 이미 로드되어 있다. Manrope·Inter는 아직 로드되지 않았다 (적용 시 `<link>` 추가 필요).

---

## 4. Elevation & Depth

### Tonal Layering

전통적인 그림자는 **최후의 수단**이다. 깊이는 "레이어링 원칙"으로 만든다.

- **Tonal Stacking**: `surface-container-lowest` 카드를 `surface-container-low` 배경 위에 놓는다. hex 값의 차이가 자연스러운 "리프트"를 만든다.
- **Ambient Shadow**: 요소가 반드시 떠야 할 때(예: 고정 CTA)만 쓴다.
  - blur `32px`, 불투명도 `6%`
  - 색은 순수 검정이 아니라 `on-surface` (`#191c21`)로 틴트해 프리미엄하고 자연스러운 빛 느낌을 유지한다.
- **Ghost Border**: 접근성 때문에 컨테이너 경계가 꼭 필요할 때만 쓴다.
  - `outline-variant` (`#c2c6d4`)를 **15% 불투명도**로. "보이지 않고 느껴지는" 수준.

```css
/* Ambient Shadow 예시 (on-surface #191c21 = rgb(25 28 33)) */
box-shadow: 0 8px 32px rgb(25 28 33 / 0.06);

/* Ghost Border 예시 (outline-variant #c2c6d4 = rgb(194 198 212)) */
border: 1px solid rgb(194 198 212 / 0.15);
```

---

## 5. 컴포넌트 규칙

### 5.1 Buttons

| 종류          | 스타일                                                                               |
| ------------- | ------------------------------------------------------------------------------------ |
| **Primary**   | `primary` → `primary_container` 그라디언트 채움, `full` 라운드, 가로 패딩 `3` (1rem) |
| **Secondary** | `surface-container-high` 배경 + `on-surface` 텍스트. **테두리 없음**                 |
| **Tertiary**  | 텍스트만, `primary` 색. hover 시 `primary_fixed`로 약한 배경 이동                    |

### 5.2 Cards & Lists

- **Zero-Divider Policy**: `<hr>`이나 `border-bottom` 구분선을 금지한다. 항목 구분은 간격 스케일(`8` 또는 `10`)로 한다.
- **Visual Grouping**: 카드 배경은 `surface-container-lowest`, 모서리는 `xl` (0.75rem).

### 5.3 Input Fields

- **기본**: `surface-container-low` 채움.
- **포커스**: `surface-container-lowest`로 전환 + `primary` 1px **Ghost Border**.
- **에러**: helper 텍스트는 `error` (`#ba1a1a`), 배경은 `error_container`로 은은한 틴트.

### 5.4 시그니처 컴포넌트

- **The "Curator" Badge**: 작은 `full` 라운드 칩. 배경 `tertiary_fixed` (`#93f2f2`), 텍스트 `on-tertiary_fixed`. 카테고리/태그용.
- **The Feature Overlay**: `surface_variant` 컨테이너 40% 불투명도 + backdrop blur. 호버 툴팁이나 추가 컨텍스트용.

---

## 6. Do / Don't

### ✅ Do

- **비대칭을 사용한다.** 큰 `display-lg` 헤드라인은 왼쪽에, 어긋나게 배치한 이미지는 오른쪽에 두어 `surface-container-low` 배경 블록과 겹치게 한다.
- **여백을 적극 활용한다.** 주요 랜딩 섹션 사이에는 `24` (8.5rem) 간격 토큰을 쓴다.
- **타이포그래피에 위계를 맡긴다.** 크기·굵기 대비로 위계를 만들고, 장식으로 해결하지 않는다.
- **경계는 배경색 차이로 만든다.** `surface` → `surface-container-low` → `surface-container-lowest` 순으로 레이어를 쌓는다.
- **주요 CTA에는 Primary Gradient를 쓴다.** `primary` → `primary_container`.
- **그림자가 필요하면 틴트한다.** `on-surface` 기반, blur `32px`, 불투명도 `6%`.
- **접근성상 경계가 필요하면 Ghost Border를 쓴다.** `outline-variant` 15%.
- **태그/카테고리는 Curator Badge로 만든다.** `tertiary_fixed` 배경의 `full` 라운드 칩.
- **목록 항목은 간격(`8`/`10`)으로 구분한다.**

### ❌ Don't

- **굵은/불투명한 테두리를 쓰지 않는다.** 카드나 섹션에 100% 불투명 border 금지.
- **1px 실선으로 섹션을 나누지 않는다.** (No-Line 규칙)
- **`<hr>`, `border-bottom` 구분선을 쓰지 않는다.** (Zero-Divider)
- **순수 검정 그림자를 쓰지 않는다.** `rgba(0,0,0,0.5)` 금지. 항상 저불투명도 + 틴트.
- **박스처럼 만들지 않는다.** 화면 전체 너비를 콘텐츠로 채우지 말고, 간격 스케일로 넉넉한 거터를 만들어 시선이 중앙-우측의 "큐레이션된" 경로로 가게 한다.
- **한 화면에 타입 스케일을 3단계 넘게 쓰지 않는다.**
- **`label-md`를 오버라인 외 용도로 쓰지 않는다.**
- **Secondary 버튼에 테두리를 넣지 않는다.**
- **임의의 hex·radius·shadow 값을 컴포넌트에 직접 쓰지 않는다.** 이 문서의 토큰만 사용한다.

---

## 7. 현재 코드와의 차이 (마이그레이션 메모)

> 이 절은 **기록용**이다. 코드는 수정하지 않았으며, 정리 방향은 별도 작업에서 확인한 뒤 진행한다.
> CLAUDE.md의 "일관성 없는 패턴"과 연결된다.

| 영역            | 현재 코드                                                                 | 디자인 시스템 기준                                | CLAUDE.md 항목 |
| --------------- | ------------------------------------------------------------------------- | ------------------------------------------------- | -------------- |
| 색상 토큰       | `src/index.css` `@theme`: 회색 계열 (`background`, `card`, `muted` 등)    | 블루/틸 팔레트, `surface-container-*` 계층        | -              |
| 서체            | Pretendard + Boogaloo(로고)                                               | Manrope(Display) + Inter(Body), 한글은 Pretendard | 8번            |
| 로고 폰트 지정  | `Layout`에서 `style={{ fontFamily: 'Boogaloo, sans-serif' }}` 인라인      | 토큰(`--font-*`)으로 지정, 인라인 금지            | 8번, 9번       |
| Primary 버튼    | `bg-foreground text-card rounded-xl` (단색, `Layout`/`NoteEditor`에 중복) | 그라디언트 + `full` 라운드, 공통 컴포넌트화       | 11번           |
| Secondary 버튼  | `bg-muted hover:bg-border`                                                | `surface-container-high`, 테두리 없음             | 11번           |
| radius / shadow | `rounded-xl/2xl/3xl`, `shadow-[...]` 임의값이 제각각                      | 카드 `xl`(0.75rem), 버튼 `full`, 정해진 그림자만  | 10번           |
| 태그 칩         | `TagInput`: `bg-muted text-muted-foreground rounded-xl`                   | Curator Badge (`tertiary_fixed`, `full`)          | -              |
| 경계선          | `border-border` 사용 (컴포넌트별)                                         | 배경색 차이 또는 Ghost Border                     | -              |

---

## 8. Tailwind v4 토큰 매핑 가이드

> 이 프로젝트는 Tailwind CSS v4(`@tailwindcss/vite`)이며 `tailwind.config.js`가 없다.
> 토큰은 `src/index.css`의 `@theme`에 선언한다. 아래는 **후속 적용 시 사용할 이름 제안**이며, 지금은 적용하지 않는다.

```css
@theme {
  /* 서피스 */
  --color-surface: #f9f9ff;
  --color-surface-container-low: #f2f3fb;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-high: #e7e8f0;

  /* 브랜드 */
  --color-primary: #00478d;
  --color-primary-container: #005eb8;
  --color-tertiary: #005151;
  --color-tertiary-fixed: #93f2f2;

  /* 텍스트 / 상태 / 경계 */
  --color-on-surface: #191c21;
  --color-outline-variant: #c2c6d4;
  --color-error: #ba1a1a;

  /* 서체 */
  --font-display: 'Manrope', 'Pretendard Variable', system-ui, sans-serif;
  --font-sans: 'Inter', 'Pretendard Variable', system-ui, sans-serif;

  /* 모서리 */
  --radius-xl: 0.75rem;
}
```

적용 후 사용 예: `bg-surface-container-lowest`, `text-on-surface`, `font-display`, `rounded-xl`.
