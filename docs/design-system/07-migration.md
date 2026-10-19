> ← [디자인 시스템 인덱스](DESIGN.md)

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
