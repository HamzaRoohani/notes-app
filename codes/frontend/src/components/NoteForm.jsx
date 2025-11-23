import React, { useEffect, useState } from 'react'

export default function NoteForm({ note, onSave, onCancel }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (note) {
      setTitle(note.title || '')
      setContent(note.content || '')
    }
  }, [note])

  const submit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onSave({ title: title.trim(), content })
    setTitle('')
    setContent('')
  }

  return (
    <form className="note-form" onSubmit={submit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="form-actions">
        <button type="submit">Save</button>
        {onCancel && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
