import React, { useState } from 'react'
import { IdeasProvider, useIdeas } from './context/IdeasContext.jsx'
import IdeaList from './components/IdeaList.jsx'
import IdeaForm from './components/IdeaForm.jsx'
import './App.css'

function AppInner() {
  const { addIdea, updateIdea, deleteIdea } = useIdeas()
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

  return (
    <div className="app">
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
