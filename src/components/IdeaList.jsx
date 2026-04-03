import React, { useState, useMemo } from 'react'
import { useIdeas } from '../context/IdeasContext.jsx'
import IdeaCard from './IdeaCard.jsx'
import SearchBar from './SearchBar.jsx'
import FilterBar from './FilterBar.jsx'

const DEFAULT_FILTERS = { statuses: [], complexities: [] }

export default function IdeaList({ onNewIdea, onSelectIdea }) {
  const { ideas } = useIdeas()
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sortBy, setSortBy] = useState('createdAt')

  const displayed = useMemo(() => {
    let list = [...ideas]

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(idea =>
        idea.title?.toLowerCase().includes(q) ||
        idea.description?.toLowerCase().includes(q) ||
        idea.problemItSolves?.toLowerCase().includes(q) ||
        (idea.tags || []).some(t => t.toLowerCase().includes(q))
      )
    }

    // Status filter
    if (filters.statuses.length > 0) {
      list = list.filter(idea => filters.statuses.includes(idea.status))
    }

    // Complexity filter
    if (filters.complexities.length > 0) {
      list = list.filter(idea => filters.complexities.includes(idea.complexity))
    }

    // Sort
    list.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return (a.title || '').localeCompare(b.title || '')
        case 'impact':
          return (b.impact || 0) - (a.impact || 0)
        case 'effort':
          return (b.effort || 0) - (a.effort || 0)
        case 'interest':
          return (b.interest || 0) - (a.interest || 0)
        case 'createdAt':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

    return list
  }, [ideas, search, filters, sortBy])

  return (
    <div className="idea-list view-enter">
      <div className="idea-list__header">
        <h1 className="idea-list__title">App-it 💡</h1>
        <button className="btn-new-idea" onClick={onNewIdea}>
          + New Idea
        </button>
      </div>

      <div className="idea-list__controls">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      <p className="idea-list__count">
        {displayed.length} {displayed.length === 1 ? 'idea' : 'ideas'}
        {ideas.length !== displayed.length ? ` of ${ideas.length}` : ''}
      </p>

      {displayed.length === 0 ? (
        <div className="idea-list__empty">
          <span className="idea-list__empty-icon">
            {ideas.length === 0 ? '💡' : '🔍'}
          </span>
          {ideas.length === 0 ? (
            <>
              <h3>No ideas yet!</h3>
              <p>Tap <strong>"+ New Idea"</strong> to capture your first brilliant idea.</p>
            </>
          ) : (
            <>
              <h3>No matches found</h3>
              <p>Try adjusting your search or filters.</p>
            </>
          )}
        </div>
      ) : (
        <div className="idea-list__grid">
          {displayed.map(idea => (
            <IdeaCard key={idea.id} idea={idea} onClick={() => onSelectIdea(idea)} />
          ))}
        </div>
      )}
    </div>
  )
}
