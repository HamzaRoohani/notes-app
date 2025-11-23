import React from 'react'

export default function NoteItem({ note, onEdit, onDelete }) {
  return (
    <div className="note-item">
      <div className="note-top">
        <strong>{note.title}</strong>
        <div className="actions">
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete} className="danger">
            Delete
          </button>
        </div>
      </div>
      {note.content && <p className="content">{note.content}</p>}
      <small className="meta">{new Date(note.createdAt).toLocaleString()}</small>
    </div>
  )
}
