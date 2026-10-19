> ← [디자인 시스템 인덱스](DESIGN.md)

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
