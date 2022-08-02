import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// const notes = [{
//     id: 1,
//     note: 'HTML is easy',
//     date: new Date().toISOString(),
//     important: Math.random() < 0.5,
//   },
//   {
//     id:2,
//     note: 'Browser can execute only javascript',
//     date: new Date().toISOString(),
//     important: Math.random() < 0.5,
//   },
//   {
//     id: 3,
//     note: 'Most important methods of HTTPS-protocol are GET and POST',
//     date: new Date().toISOString(),
//     important: Math.random() < 0.5,
//   },
//   {
//     id: 4,
//     note: 'Page manipulation from console is easy',
//     date: new Date().toISOString(),
//     important: Math.random() < 0.5,
//   }
// ]

// axios
//     .get('http://localhost:3001/notes')
//     .then(response => {
//       const notes = response.data
//       console.log(notes);
//     })

ReactDOM.render(<App />, document.getElementById('root'))