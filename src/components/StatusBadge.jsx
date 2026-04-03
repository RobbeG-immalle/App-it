import React from 'react'

const STATUS_MAP = {
  '💡 Idea':        { cls: 'idea',        label: '💡 Idea' },
  '🔍 Validating':  { cls: 'validating',  label: '🔍 Validating' },
  '🛠 Building':    { cls: 'building',    label: '🛠 Building' },
  '🚀 Launched':    { cls: 'launched',    label: '🚀 Launched' },
  '❌ Dropped':     { cls: 'dropped',     label: '❌ Dropped' },
}

export default function StatusBadge({ status }) {
  const info = STATUS_MAP[status] || { cls: 'idea', label: status }
  return (
    <span className={`status-badge status-badge--${info.cls}`}>
      {info.label}
    </span>
  )
}
