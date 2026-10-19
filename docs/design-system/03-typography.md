> ← [디자인 시스템 인덱스](DESIGN.md)

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
