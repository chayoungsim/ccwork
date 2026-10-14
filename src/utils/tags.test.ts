import { normalizeTag, isDuplicateTag, validateTag, MAX_TAG_LENGTH, MAX_TAG_COUNT } from './tags';

describe('normalizeTag', () => {
  it('앞뒤 공백과 선행 #을 제거한다', () => {
    expect(normalizeTag('  #react ')).toBe('react');
    expect(normalizeTag('##a')).toBe('a');
  });

  it('공백뿐이거나 #뿐이면 빈 문자열을 반환한다', () => {
    expect(normalizeTag('   ')).toBe('');
    expect(normalizeTag('#')).toBe('');
  });
});

describe('isDuplicateTag', () => {
  it('대소문자를 무시하고 중복을 판정한다', () => {
    expect(isDuplicateTag(['React'], 'react')).toBe(true);
    expect(isDuplicateTag(['React'], 'vue')).toBe(false);
  });
});

describe('validateTag', () => {
  it('정상 입력은 정규화된 태그를 반환하고 표기를 유지한다', () => {
    expect(validateTag([], ' #TypeScript ')).toEqual({ ok: true, tag: 'TypeScript' });
  });

  it('빈 값은 메시지 없이 거부한다', () => {
    expect(validateTag([], '  ')).toEqual({ ok: false, message: null });
  });

  it('중복은 거부한다', () => {
    const result = validateTag(['React'], 'REACT');
    expect(result.ok).toBe(false);
  });

  it('길이 제한 경계값: 20자 허용, 21자 거부', () => {
    expect(validateTag([], 'a'.repeat(MAX_TAG_LENGTH)).ok).toBe(true);
    expect(validateTag([], 'a'.repeat(MAX_TAG_LENGTH + 1)).ok).toBe(false);
  });

  it('개수 제한 경계값: 9개일 때 허용, 10개일 때 거부', () => {
    const make = (n: number) => Array.from({ length: n }, (_, i) => `tag${i}`);
    expect(validateTag(make(MAX_TAG_COUNT - 1), 'new').ok).toBe(true);
    expect(validateTag(make(MAX_TAG_COUNT), 'new').ok).toBe(false);
  });
});
