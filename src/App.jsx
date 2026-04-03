import React, { useState } from 'react'
import { IdeasProvider, useIdeas } from './context/IdeasContext.jsx'
import IdeaList from './components/IdeaList.jsx'
import IdeaForm from './components/IdeaForm.jsx'
import './App.css'

function AppInner() {
  const { addIdea, updateIdea, deleteIdea, loading, error, isLocalOnly } = useIdeas()
  const [view, setView] = useState('list') // 'list' | 'form'
  const [selectedIdea, setSelectedIdea] = useState(null)

  function openNewIdea() {
    setSelectedIdea(null)
    setView('form')
  }

  function openEditIdea(idea) {
    setSelectedIdea(idea)
    setView('form')
  }

  function handleSave(formData) {
    if (selectedIdea) {
      updateIdea({ ...formData, id: selectedIdea.id })
    } else {
      addIdea(formData)
    }
    setView('list')
    setSelectedIdea(null)
  }

  function handleCancel() {
    setView('list')
    setSelectedIdea(null)
  }

  function handleDelete(id) {
    deleteIdea(id)
    setView('list')
    setSelectedIdea(null)
  }

  if (loading) {
    return (
      <div className="app app--loading">
        <div className="loading-spinner" />
        <p>Loading ideas…</p>
      </div>
    )
  }

  return (
    <div className="app">
      {isLocalOnly && (
        <div className="local-mode-banner">
          📦 Local-only mode — ideas are saved to this device only.
          <a
            href="https://github.com/RobbeG-immalle/App-it#supabase-setup"
            target="_blank"
            rel="noreferrer"
          >
            {' '}Set up Supabase →
          </a>
        </div>
      )}
      {error && (
        <div className="error-banner">
          ⚠️ Supabase error: {error}
        </div>
      )}
      {view === 'list' ? (
        <IdeaList
          onNewIdea={openNewIdea}
          onSelectIdea={openEditIdea}
        />
      ) : (
        <IdeaForm
          idea={selectedIdea}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <IdeasProvider>
      <AppInner />
    </IdeasProvider>
  )
}
