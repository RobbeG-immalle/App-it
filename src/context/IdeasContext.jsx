import React, { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'

const STORAGE_KEY = 'appit_ideas'

// ── Field name mapping ────────────────────────────────────────────────────────
// App uses camelCase; Supabase columns use snake_case.

function toDb(idea) {
  return {
    title: idea.title,
    description: idea.description ?? null,
    problem_it_solves: idea.problemItSolves ?? null,
    target_audience: idea.targetAudience ?? null,
    monetization: idea.monetization ?? [],
    pricing: idea.pricing ?? null,
    complexity: idea.complexity ?? null,
    tech_stack: idea.techStack ?? null,
    dependencies: idea.dependencies ?? null,
    impact: idea.impact ?? null,
    effort: idea.effort ?? null,
    interest: idea.interest ?? null,
    tags: idea.tags ?? [],
    status: idea.status ?? '💡 Idea',
  }
}

function fromDb(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    problemItSolves: row.problem_it_solves ?? '',
    targetAudience: row.target_audience ?? '',
    monetization: row.monetization ?? [],
    pricing: row.pricing ?? '',
    complexity: row.complexity ?? 'Medium',
    techStack: row.tech_stack ?? '',
    dependencies: row.dependencies ?? '',
    impact: row.impact ?? 3,
    effort: row.effort ?? 3,
    interest: row.interest ?? 3,
    tags: row.tags ?? [],
    status: row.status ?? '💡 Idea',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

// ── Local-only helpers ────────────────────────────────────────────────────────

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveToStorage(ideas) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas))
  } catch {
    // Storage quota exceeded – silently ignore
  }
}

// ── Reducer (used only in local-only mode) ────────────────────────────────────

function ideasReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload
    case 'ADD': {
      const now = new Date().toISOString()
      const idea = { ...action.payload, id: generateId(), createdAt: now, updatedAt: now }
      return [...state, idea]
    }
    case 'UPDATE':
      return state.map(idea =>
        idea.id === action.payload.id
          ? { ...idea, ...action.payload, updatedAt: new Date().toISOString() }
          : idea
      )
    case 'DELETE':
      return state.filter(idea => idea.id !== action.payload)
    default:
      return state
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

const IdeasContext = createContext(null)

export function IdeasProvider({ children }) {
  const [ideas, dispatch] = useReducer(ideasReducer, [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ── Initial load ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isSupabaseConfigured) {
      dispatch({ type: 'INIT', payload: loadFromStorage() })
      setLoading(false)
      return
    }

    supabase
      .from('ideas')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (err) {
          setError(err.message)
        } else {
          dispatch({ type: 'INIT', payload: data.map(fromDb) })
        }
        setLoading(false)
      })
  }, [])

  // ── Persist to localStorage when in local-only mode ─────────────────────────
  useEffect(() => {
    if (!isSupabaseConfigured && !loading) {
      saveToStorage(ideas)
    }
  }, [ideas, loading])

  // ── CRUD ────────────────────────────────────────────────────────────────────

  async function addIdea(data) {
    if (!isSupabaseConfigured) {
      dispatch({ type: 'ADD', payload: data })
      return
    }
    const { data: rows, error: err } = await supabase
      .from('ideas')
      .insert(toDb(data))
      .select()
    if (err) {
      setError(err.message)
      return
    }
    dispatch({ type: 'INIT', payload: [fromDb(rows[0]), ...ideas] })
  }

  async function updateIdea(data) {
    if (!isSupabaseConfigured) {
      dispatch({ type: 'UPDATE', payload: data })
      return
    }
    const { data: rows, error: err } = await supabase
      .from('ideas')
      .update({ ...toDb(data), updated_at: new Date().toISOString() })
      .eq('id', data.id)
      .select()
    if (err) {
      setError(err.message)
      return
    }
    dispatch({ type: 'UPDATE', payload: fromDb(rows[0]) })
  }

  async function deleteIdea(id) {
    if (!isSupabaseConfigured) {
      dispatch({ type: 'DELETE', payload: id })
      return
    }
    const { error: err } = await supabase.from('ideas').delete().eq('id', id)
    if (err) {
      setError(err.message)
      return
    }
    dispatch({ type: 'DELETE', payload: id })
  }

  return (
    <IdeasContext.Provider
      value={{ ideas, addIdea, updateIdea, deleteIdea, loading, error, isLocalOnly: !isSupabaseConfigured }}
    >
      {children}
    </IdeasContext.Provider>
  )
}

export function useIdeas() {
  const ctx = useContext(IdeasContext)
  if (!ctx) throw new Error('useIdeas must be used within IdeasProvider')
  return ctx
}
