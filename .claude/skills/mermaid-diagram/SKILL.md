---
name: mermaid-diagram
description: src/ 디렉토리를 분석해 컴포넌트 의존성 관계와 상태 흐름을 Mermaid 다이어그램으로 시각화하고, docs/architecture/index.html로 저장한 뒤 브라우저로 연다. 사용자가 "아키텍처 시각화", "구조 다이어그램", "컴포넌트 의존성 그려줘", "mermaid로 구조 보여줘" 등을 요청할 때 사용한다.
---

# Mermaid 아키텍처 다이어그램 생성

## 1. src/ 분석 (추측 금지, 실제 코드 기준)

- `src/` 아래 모든 .ts/.tsx 파일의 import 문을 수집해 **파일 간 의존 관계** 파악
- 각 파일을 역할별로 분류: 엔트리(main) / 루트(App) / 컴포넌트 / Context·훅 / API / 타입 / 스타일
- 컴포넌트 렌더 관계(JSX에서 어떤 컴포넌트를 렌더하는지)와 props 전달(특히 `on*` 콜백, 상태값) 파악
- 상태 위치 파악: `useState` 보유 컴포넌트, Context Provider·커스텀 훅, 그 상태를 읽고 쓰는 컴포넌트
- 외부 의존(API 서버 URL, json-server 등) 확인

## 2. 다이어그램 구성

### (필수) 컴포넌트 의존성 그래프 — 가장 중요

- `flowchart TD`, 역할별 `subgraph`(Entry / Components / State / API / Types)
- 화살표 구분: 렌더 관계 `-->`, import/사용 관계 `-.->`, 라벨에 전달 props나 사용 훅 표기
- `classDef`로 역할별 색 구분 + 범례 표기

### (가능하면) 상태 흐름

- `flowchart LR`: UI 상태(App의 useState)와 서버 상태(Context)가 어디서 생성되고 어떤 props/훅으로 흐르는지
- `sequenceDiagram`: 대표 사용자 동작 1~2개(예: 노트 저장, 삭제)의
  사용자 → 컴포넌트 → Context → API → 서버 → setState → 리렌더 순서
- 에러 처리 누락 등 코드에서 확인된 문제는 `Note` 블록으로 표시

## 3. HTML 생성 — docs/architecture/index.html

- 기존 파일이 있으면 덮어씀 (다시 생성하는 용도)
- Mermaid는 CDN의 **정확한 버전**으로 로드: `https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js`
- `mermaid.initialize({ startOnLoad: true, theme: 'default', securityLevel: 'strict' })`
- 구성: 제목 + 생성일 → 섹션별 다이어그램(제목, 1~2줄 설명) → 범례 → 분석한 파일 목록 요약
- 접근성: `<html lang="ko">`, `header`/`main`/`section` 시맨틱 구조, 각 다이어그램 섹션에 `aria-labelledby`,
  다이어그램 아래에 텍스트 요약(스크린리더 대체 설명)
- 반응형: 다이어그램 컨테이너 `overflow-x: auto`, 최대 폭 제한, 모바일 16px 여백
- 외부 파일 없이 단일 HTML (CSS는 `<style>` 인라인)
- Mermaid 코드는 `<pre class="mermaid">` 안에 넣으므로 `<`는 반드시 `&lt;`로 이스케이프
  (`<br/>` → `&lt;br/&gt;`, 제네릭 `Promise<Note>` 등). 화살표의 `>`는 그대로 사용 가능
- 노드 라벨은 `id["라벨"]`처럼 따옴표로 감싸고, 괄호·특수문자가 든 엣지 라벨도 `|"라벨"|`로 감싼다

## 4. 브라우저로 열기 (Windows 기준)

- PowerShell: `Start-Process docs/architecture/index.html`
- Git Bash: `start docs/architecture/index.html`
- 위가 실패하면 `explorer.exe "docs\architecture\index.html"`
- 기본 브라우저로 file://로 바로 열림 (로컬 서버 불필요)

## 5. 완료 보고

- 생성 파일 경로, 포함된 다이어그램 목록, 분석 중 발견한 특이사항(순환 참조, 미사용 파일 등)을 짧게 보고
