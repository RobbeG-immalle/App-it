import React from 'react'

const STATUSES = ['💡 Idea', '🔍 Validating', '🛠 Building', '🚀 Launched', '❌ Dropped']
const COMPLEXITIES = ['Low', 'Medium', 'High']
const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'title', label: 'Title' },
  { value: 'impact', label: 'Impact' },
  { value: 'effort', label: 'Effort' },
  { value: 'interest', label: 'Interest' },
]

export default function FilterBar({ filters, onFilterChange, sortBy, onSortChange }) {
  function toggleStatus(status) {
    const current = filters.statuses || []
    const next = current.includes(status)
      ? current.filter(s => s !== status)
      : [...current, status]
    onFilterChange({ ...filters, statuses: next })
  }

  function toggleComplexity(complexity) {
    const current = filters.complexities || []
    const next = current.includes(complexity)
      ? current.filter(c => c !== complexity)
      : [...current, complexity]
    onFilterChange({ ...filters, complexities: next })
  }

  const activeStatuses = filters.statuses || []
  const activeComplexities = filters.complexities || []

  return (
    <div className="filter-bar">
      <div className="filter-bar__group filter-bar__group--full">
        <span className="filter-bar__label">Status</span>
        <div className="filter-bar__chips">
          {STATUSES.map(s => (
            <button
              key={s}
              type="button"
              className={`filter-chip${activeStatuses.includes(s) ? ' active' : ''}`}
              onClick={() => toggleStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-bar__group">
        <span className="filter-bar__label">Complexity</span>
        <div className="filter-bar__chips">
          {COMPLEXITIES.map(c => (
            <button
              key={c}
              type="button"
              className={`filter-chip${activeComplexities.includes(c) ? ' active' : ''}`}
              onClick={() => toggleComplexity(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-bar__group">
        <span className="filter-bar__label">Sort by</span>
        <select
          className="filter-bar__sort"
          value={sortBy}
          onChange={e => onSortChange(e.target.value)}
          aria-label="Sort ideas by"
        >
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
