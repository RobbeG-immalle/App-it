import React, { createContext, useContext, useReducer, useEffect } from 'react'

const STORAGE_KEY = 'appit_ideas'

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function ideasReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const now = new Date().toISOString()
      const idea = { ...action.payload, id: generateId(), createdAt: now, updatedAt: now }
      return [...state, idea]
    }
    case 'UPDATE': {
      return state.map(idea =>
        idea.id === action.payload.id
          ? { ...idea, ...action.payload, updatedAt: new Date().toISOString() }
          : idea
      )
    }
    case 'DELETE':
      return state.filter(idea => idea.id !== action.payload)
    case 'INIT':
      return action.payload
    default:
      return state
  }
}

const IdeasContext = createContext(null)

export function IdeasProvider({ children }) {
  const [ideas, dispatch] = useReducer(ideasReducer, [], () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas))
    } catch {
      // Storage quota exceeded – silently ignore
    }
  }, [ideas])

  function addIdea(data) {
    dispatch({ type: 'ADD', payload: data })
  }

  function updateIdea(data) {
    dispatch({ type: 'UPDATE', payload: data })
  }

  function deleteIdea(id) {
    dispatch({ type: 'DELETE', payload: id })
  }

  return (
    <IdeasContext.Provider value={{ ideas, addIdea, updateIdea, deleteIdea }}>
      {children}
    </IdeasContext.Provider>
  )
}

export function useIdeas() {
  const ctx = useContext(IdeasContext)
  if (!ctx) throw new Error('useIdeas must be used within IdeasProvider')
  return ctx
}
