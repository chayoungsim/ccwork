> ← [디자인 시스템 인덱스](DESIGN.md)

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
