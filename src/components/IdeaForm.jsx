import React, { useState } from 'react'
import PriorityScore from './PriorityScore.jsx'
import TagInput from './TagInput.jsx'

const STATUSES = ['💡 Idea', '🔍 Validating', '🛠 Building', '🚀 Launched', '❌ Dropped']
const COMPLEXITIES = ['Low', 'Medium', 'High']
const MONETIZATION_OPTIONS = [
  'subscription', 'one-time', 'freemium', 'ads', 'marketplace',
  'consulting', 'open-source', 'sponsorship', 'usage-based',
]

function statusClass(status) {
  const map = {
    '💡 Idea': 'idea',
    '🔍 Validating': 'validating',
    '🛠 Building': 'building',
    '🚀 Launched': 'launched',
    '❌ Dropped': 'dropped',
  }
  return map[status] || 'idea'
}

const DEFAULT_IDEA = {
  title: '',
  description: '',
  problemItSolves: '',
  targetAudience: '',
  monetization: [],
  pricing: '',
  complexity: 'Medium',
  techStack: '',
  dependencies: '',
  impact: 3,
  effort: 3,
  interest: 3,
  tags: [],
  status: '💡 Idea',
}

export default function IdeaForm({ idea, onSave, onCancel, onDelete }) {
  const isEditing = Boolean(idea)
  const [form, setForm] = useState(() => (idea ? { ...idea } : { ...DEFAULT_IDEA }))

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function toggleMonetization(opt) {
    const current = form.monetization || []
    const next = current.includes(opt)
      ? current.filter(m => m !== opt)
      : [...current, opt]
    set('monetization', next)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      alert('Please enter a title for your idea.')
      return
    }
    onSave(form)
  }

  function handleDelete() {
    if (window.confirm('Delete this idea? This cannot be undone.')) {
      onDelete(idea.id)
    }
  }

  function formatDate(iso) {
    if (!iso) return '—'
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium', timeStyle: 'short',
    })
  }

  return (
    <div className="idea-form view-enter">
      <form onSubmit={handleSubmit} noValidate>
        {/* Sticky top bar */}
        <div className="idea-form__topbar">
          <span className="idea-form__topbar-title">
            {isEditing ? `✏️ ${form.title || 'Edit Idea'}` : '✨ New Idea'}
          </span>
          <div className="idea-form__topbar-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              💾 Save
            </button>
          </div>
        </div>

        <div className="idea-form__body">
          {/* ── Status ─────────────────────────────────── */}
          <div className="form-section">
            <span className="form-section__title">Status</span>
            <div className="status-picker">
              {STATUSES.map(s => (
                <button
                  key={s}
                  type="button"
                  className={`status-btn status-btn--${statusClass(s)}${form.status === s ? ' active' : ''}`}
                  onClick={() => set('status', s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ── Core ───────────────────────────────────── */}
          <div className="form-section">
            <span className="form-section__title">Core Info</span>

            <div className="form-field">
              <label htmlFor="title">Title <span>*</span></label>
              <input
                id="title"
                type="text"
                placeholder="What's your idea called?"
                value={form.title}
                onChange={e => set('title', e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="description">Description <span>optional</span></label>
              <textarea
                id="description"
                placeholder="Brief overview of the idea…"
                value={form.description}
                onChange={e => set('description', e.target.value)}
                rows={3}
              />
            </div>

            <div className="form-field">
              <label htmlFor="targetAudience">Target Audience</label>
              <input
                id="targetAudience"
                type="text"
                placeholder="Who is this for?"
                value={form.targetAudience}
                onChange={e => set('targetAudience', e.target.value)}
              />
            </div>
          </div>

          {/* ── Problem it solves (prominent) ──────────── */}
          <div className="form-section form-section--problem">
            <span className="form-section__title">
              ⚠️ Problem it Solves
            </span>
            <div className="form-field">
              <label htmlFor="problemItSolves">
                <span className="problem-label">
                  What problem does this solve?
                  <span className="problem-label__badge">Super Important</span>
                </span>
              </label>
              <textarea
                id="problemItSolves"
                placeholder="Describe the real pain point or problem this addresses…"
                value={form.problemItSolves}
                onChange={e => set('problemItSolves', e.target.value)}
                rows={4}
              />
            </div>
          </div>

          {/* ── Priority Scores ─────────────────────────── */}
          <div className="form-section">
            <span className="form-section__title">Priority Scores</span>
            <div className="scores-row">
              <PriorityScore
                label="Impact"
                value={form.impact}
                onChange={v => set('impact', v)}
              />
              <PriorityScore
                label="Effort"
                value={form.effort}
                onChange={v => set('effort', v)}
              />
              <PriorityScore
                label="Interest"
                value={form.interest}
                onChange={v => set('interest', v)}
              />
            </div>
          </div>

          {/* ── Complexity & Tags ───────────────────────── */}
          <div className="form-section">
            <span className="form-section__title">Complexity & Tags</span>

            <div className="form-field">
              <label>Complexity</label>
              <div className="complexity-picker">
                {COMPLEXITIES.map(c => (
                  <button
                    key={c}
                    type="button"
                    className={`complexity-btn complexity-btn--${c}${form.complexity === c ? ' active' : ''}`}
                    onClick={() => set('complexity', c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label>Tags</label>
              <TagInput tags={form.tags} onChange={v => set('tags', v)} />
            </div>
          </div>

          {/* ── Tech ────────────────────────────────────── */}
          <div className="form-section">
            <span className="form-section__title">Technical</span>

            <div className="form-field">
              <label htmlFor="techStack">Tech Stack</label>
              <input
                id="techStack"
                type="text"
                placeholder="e.g. React Native, Supabase, OpenAI API"
                value={form.techStack}
                onChange={e => set('techStack', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="dependencies">Key Dependencies / Risks</label>
              <textarea
                id="dependencies"
                placeholder="Third-party APIs, integrations, blockers…"
                value={form.dependencies}
                onChange={e => set('dependencies', e.target.value)}
                rows={2}
              />
            </div>
          </div>

          {/* ── Monetization ────────────────────────────── */}
          <div className="form-section">
            <span className="form-section__title">Monetization</span>

            <div className="form-field">
              <label>Models <span>select all that apply</span></label>
              <div className="monetization-options">
                {MONETIZATION_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    className={`mono-chip${(form.monetization || []).includes(opt) ? ' active' : ''}`}
                    onClick={() => toggleMonetization(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="pricing">Pricing Notes</label>
              <input
                id="pricing"
                type="text"
                placeholder="e.g. $9/mo, free tier + $29/mo pro"
                value={form.pricing}
                onChange={e => set('pricing', e.target.value)}
              />
            </div>
          </div>

          {/* ── Bottom Actions ──────────────────────────── */}
          <div className="form-bottom-actions">
            {isEditing ? (
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                🗑 Delete
              </button>
            ) : (
              <span />
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                💾 Save Idea
              </button>
            </div>
          </div>

          {isEditing && (
            <p className="form-meta">
              Created {formatDate(idea.createdAt)} · Updated {formatDate(idea.updatedAt)}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
