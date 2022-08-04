import React, {useState, useEffect} from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  }, [])

  const onChangeNote = e => setNewNote(e.target.value)

  const onSubmitAddNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteService 
    .create(noteObject)
      .then(returnedNote => {
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

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(note.id, changedNote)
        .then(returnedNote => {
          // setNotes(notes.map(note => note.id !== id ? note : returnedNote))
          noteService
            .getAll()
              .then(notes => {
                setNotes(notes)
              })
          })
        .catch(error => {
          setErrorMessage(
            `Note '${note.content}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
  }

  const filter = notes.filter(note => {
    return (
      showAll 
      ? note.important === showAll
      : note.important === true || note.important === false
    )
  })

  return (
    <>
      <h1>Notes</h1>
      <Notification 
        message={errorMessage}
      />
      <div>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {!showAll ? 'important' : 'all' }
          </button>
        </div>      
        <ul>
          {
            <>
              {filter.map((note, i) => 
                <Note
                  key={i}
                  note={note} 
                  toggleImportance={() => toggleImportanceOf(note.id)}
                />
              )} 
            </>
          }
        </ul>
      </div>
      <div>
        <form  onSubmit={onSubmitAddNote}>
          <input type="text" onChange={onChangeNote} value={newNote}/>
          <button>Save</button>
        </form>
      </div>
      <Footer />
    </>
  )
} 

export default App;