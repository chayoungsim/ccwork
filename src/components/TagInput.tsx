import { useState, KeyboardEvent } from 'react';
import { validateTag } from '../utils/tags';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export function TagInput({ tags, onChange }: TagInputProps) {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const addTag = () => {
    const result = validateTag(tags, value);
    if (!result.ok) {
      setMessage(result.message);
      return;
    }
    onChange([...tags, result.tag]);
    setValue('');
    setMessage(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 한글 IME 조합 중에는 제출하지 않음
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const handleRemove = (target: string) => {
    onChange(tags.filter((t) => t !== target));
    setMessage(null);
  };

  return (
    <div>
      {/* 입력창 */}
      <label htmlFor="tag-input" className="sr-only">
        태그 추가
      </label>
      <input
        id="tag-input"
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setMessage(null);
        }}
        onKeyDown={handleKeyDown}
        placeholder="태그 입력 후 Enter"
        aria-describedby="tag-message"
        className="w-full text-sm text-foreground bg-transparent border-none outline-none placeholder:text-muted-foreground/50"
      />

      {/* 안내 메시지 */}
      <p id="tag-message" role="alert" className="text-xs text-destructive mt-1 min-h-4">
        {message}
      </p>

      {/* 태그 칩 목록 */}
      {tags.length > 0 && (
        <ul className="flex flex-wrap gap-2 mt-2" aria-label="추가된 태그">
          {tags.map((tag) => (
            <li
              key={tag}
              className="flex items-center gap-1 max-w-full bg-muted text-muted-foreground text-xs font-semibold rounded-xl pl-3 pr-1 py-1"
            >
              <span className="truncate max-w-48">{tag}</span>
              <button
                type="button"
                onClick={() => handleRemove(tag)}
                aria-label={`${tag} 태그 삭제`}
                className="w-5 h-5 rounded-full hover:bg-border transition-colors cursor-pointer"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
