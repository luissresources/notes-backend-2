import React, {useState, useEffect} from 'react'
import Footer from './components/Footer'
import LoginForm from './components/forms/LoginForm'
import NoteForm from './components/forms/NoteForm'
import Note from './components/Note'
import Notification from './components/Notification'
import loginService from './services/login'
import noteService from './services/notes'

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  }, [])

  const handleNoteChange = e => setNewNote(e.target.value)

  const addNote = (e) => {
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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <h1>Notes</h1>
      <Notification 
        message={errorMessage}
      />
      { user === null 
        ? 
          <LoginForm
            handleLogin= { handleLogin }
            username = { username }
            setUsername = { setUsername }
            password = { password }
            setPassword = { setPassword }
          />
        : 
          <div>
            <p>{user.name} logged in</p>
            <NoteForm 
              addNote = { addNote }
              newNote = { newNote }
              handleNoteChange = { handleNoteChange }
            />
          </div>
      }

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
      <Footer />
    </>
  )
} 

export default App;