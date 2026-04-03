import React, { useState } from 'react'

const SUGGESTIONS = ['AI', 'mobile', 'game', 'B2B', 'fun', 'serious', 'productivity', 'social']

export default function TagInput({ tags = [], onChange }) {
  const [input, setInput] = useState('')

  function addTag(tag) {
    const trimmed = tag.trim()
    if (!trimmed || tags.includes(trimmed)) return
    onChange([...tags, trimmed])
    setInput('')
  }

  function removeTag(tag) {
    onChange(tags.filter(t => t !== tag))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(input)
    } else if (e.key === 'Backspace' && input === '' && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <div className="tag-input">
      {tags.length > 0 && (
        <div className="tag-input__tags">
          {tags.map((tag, i) => (
            <span key={tag} className={`tag-chip tag-chip--${i % 8}`}>
              {tag}
              <button
                type="button"
                className="tag-input__remove"
                onClick={() => removeTag(tag)}
                aria-label={`Remove tag ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="tag-input__field">
        <input
          type="text"
          placeholder="Add a tag…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="tag-input__add-btn"
          onClick={() => addTag(input)}
        >
          Add
        </button>
      </div>
      <div className="tag-input__suggestions">
        {SUGGESTIONS.map(s => (
          <button
            key={s}
            type="button"
            className={`tag-input__suggestion${tags.includes(s) ? ' used' : ''}`}
            onClick={() => addTag(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
