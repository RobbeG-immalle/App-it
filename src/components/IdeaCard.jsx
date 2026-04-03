import React from 'react'
import StatusBadge from './StatusBadge.jsx'
import PriorityScore from './PriorityScore.jsx'

export default function IdeaCard({ idea, onClick }) {
  const desc = idea.description
    ? idea.description.length > 80
      ? idea.description.slice(0, 80) + '…'
      : idea.description
    : ''

  return (
    <div className="idea-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}>
      <div className="idea-card__header">
        <h3 className="idea-card__title">{idea.title}</h3>
        <div className="idea-card__badges">
          <StatusBadge status={idea.status} />
          {idea.complexity && (
            <span className={`complexity-badge complexity-badge--${idea.complexity}`}>
              {idea.complexity}
            </span>
          )}
        </div>
      </div>

      {desc && <p className="idea-card__description">{desc}</p>}

      <div className="idea-card__footer">
        <div className="idea-card__tags">
          {(idea.tags || []).slice(0, 5).map((tag, i) => (
            <span key={tag} className={`tag-chip tag-chip--${i % 8}`}>{tag}</span>
          ))}
        </div>

        <div className="idea-card__scores">
          <div className="idea-card__score">
            <span className="idea-card__score-label">Impact</span>
            <PriorityScore value={idea.impact || 0} small />
          </div>
          <div className="idea-card__score">
            <span className="idea-card__score-label">Effort</span>
            <PriorityScore value={idea.effort || 0} small />
          </div>
          <div className="idea-card__score">
            <span className="idea-card__score-label">Interest</span>
            <PriorityScore value={idea.interest || 0} small />
          </div>
        </div>
      </div>
    </div>
  )
}
