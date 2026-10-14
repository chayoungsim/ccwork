export const MAX_TAG_LENGTH = 20;
export const MAX_TAG_COUNT = 10;

// 앞뒤 공백과 선행 # 제거
export function normalizeTag(raw: string): string {
  return raw.trim().replace(/^#+/, '').trim();
}

// 대소문자 무시 중복 검사
export function isDuplicateTag(tags: string[], tag: string): boolean {
  const target = tag.toLowerCase();
  return tags.some((t) => t.toLowerCase() === target);
}

export type TagValidation = { ok: true; tag: string } | { ok: false; message: string | null };

// 추가 가능 여부 검사. 빈 값은 메시지 없이 무시(message: null)
export function validateTag(tags: string[], raw: string): TagValidation {
  const tag = normalizeTag(raw);
  if (!tag) return { ok: false, message: null };
  if (tag.length > MAX_TAG_LENGTH) {
    return { ok: false, message: `태그는 ${MAX_TAG_LENGTH}자 이하로 입력해주세요` };
  }
  if (tags.length >= MAX_TAG_COUNT) {
    return { ok: false, message: `태그는 최대 ${MAX_TAG_COUNT}개까지 추가할 수 있어요` };
  }
  if (isDuplicateTag(tags, tag)) {
    return { ok: false, message: '이미 추가된 태그입니다' };
  }
  return { ok: true, tag };
}
