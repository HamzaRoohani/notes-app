import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NoteForm from './NoteForm'
import NoteItem from './NoteItem'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

export default function NoteList() {
  const [notes, setNotes] = useState([])
  const [editing, setEditing] = useState(null)

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/notes`)
      setNotes(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const handleAdd = async (data) => {
    try {
      await axios.post(`${API_BASE}/notes`, data)
      fetchNotes()
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdate = async (id, data) => {
    try {
      await axios.put(`${API_BASE}/notes/${id}`, data)
      setEditing(null)
      fetchNotes()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/notes/${id}`)
      fetchNotes()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="note-list">
      <NoteForm onSave={handleAdd} />
      <div className="notes">
        {notes.length === 0 && <p>No notes yet.</p>}
        {notes.map((note) => (
          <NoteItem
            key={note._id}
            note={note}
            onEdit={() => setEditing(note)}
            onDelete={() => handleDelete(note._id)}
          />
        ))}
      </div>

      {editing && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Note</h3>
            <NoteForm
              note={editing}
              onSave={(data) => handleUpdate(editing._id, data)}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
