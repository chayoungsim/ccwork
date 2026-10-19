> ← [디자인 시스템 인덱스](DESIGN.md)

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
