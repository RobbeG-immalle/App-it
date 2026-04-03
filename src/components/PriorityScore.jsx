import React from 'react'

export default function PriorityScore({ value = 0, onChange, label, small = false }) {
  const dotSize = small ? 'priority-dot--sm' : ''

  return (
    <div className="priority-score">
      {label && <span className="priority-score__label">{label}</span>}
      <div className="priority-score__dots">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            className={[
              'priority-dot',
              dotSize,
              n <= value ? 'filled' : '',
              onChange ? 'clickable' : '',
            ].filter(Boolean).join(' ')}
            onClick={onChange ? () => onChange(n === value ? 0 : n) : undefined}
            aria-label={`Set ${label ?? 'score'} to ${n}`}
          />
        ))}
      </div>
    </div>
  )
}
