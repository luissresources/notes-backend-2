import { useState } from 'react'
import noteService from '../../services/notes'

const NoteForm = ({ setNotes, setShowAll }) => {

  const [newNote, setNewNote] = useState('')

  const handleNoteChange = e => setNewNote(e.target.value)

  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(() => {
        // setNotes(notes.concat(returnedNote.data))
        noteService
          .getAll()
          .then(response => {
            setNotes(response)
          })
        setShowAll(false)
        setNewNote('')
      })
  }

  return (
    <>
      <h2>create new note</h2>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </>
  )
}

export default NoteForm