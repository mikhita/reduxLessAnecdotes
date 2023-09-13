import { useState } from 'react'

import {
  Routes,
  Route,
  Link,
  // Navigate,
  // useParams,
  useNavigate,
  useMatch
} from "react-router-dom"
import { useField } from './hooks';

// const Menu = () => {
//   const padding = {
//     paddingRight: 5
//   }
//   return (
//     <div>
//       <a href='#' style={padding}>anecdotes</a>
//       <a href='#' style={padding}>create new</a>
//       <a href='#' style={padding}>about</a>
//     </div>
//   )
// }

// eslint-disable-next-line react/prop-types
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {/*eslint-disable-next-line react/prop-types */}
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul> 
  </div>
)

// eslint-disable-next-line react/prop-types
const Anecdote = ({ anecdote }) => {
  if (!anecdote) {
    // Handle the case where anecdote is null or undefined
    return <div>Anecdote not found.</div>;
  }

  return (
    <div>
      {/* eslint-disable-next-line react/prop-types */}
      <h2>{anecdote.content}</h2>
      {/* eslint-disable-next-line react/prop-types */}
      <div>{anecdote.author}</div>
      {/* eslint-disable-next-line react/prop-types */}
      <div>{anecdote.info }</div>
      {/* eslint-disable-next-line react/prop-types */}
      <div><strong>{"Votes " + anecdote.votes }</strong></div>
    </div>
  )
}

// const About = () => (
//   <div>
//     <h2>About anecdote app</h2>
//     <p>According to Wikipedia:</p>

//     <em>An anecdote is a brief, revealing account of an individual person or an incident.
//       Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
//       such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
//       An anecdote is a story with a point.</em>

//     <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
//   </div>
// )

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const navigate = useNavigate();
  const content = useField('text'); // Create fields for content, author, and info
  const author = useField('text');
  const info = useField('text');
  const [notification, setNotification] = useState('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  


  const handleSubmit = (e) => {
    e.preventDefault()
    // eslint-disable-next-line react/prop-types
    const newAnecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    };

    // Call the addNew function passed as a prop
    // eslint-disable-next-line react/prop-types
    props.addNew(newAnecdote);

    // Show a notification
    setNotification('Anecdote created successfully.');
    setIsNotificationVisible(true);

    // Hide the notification after 5 seconds
    setTimeout(() => {
      setIsNotificationVisible(false);
    }, 5000);

    // Reset field values
    content.onChange({ target: { value: '' } }); 
    author.onChange({ target: { value: '' } });
    info.onChange({ target: { value: '' } });
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      {isNotificationVisible && <div>{notification}</div>}
      {isNotificationVisible && (
        // eslint-disable-next-line no-undef, react/prop-types
        <AnecdoteList anecdotes={props.anecdotes} />
      )}
      <button onClick={() => navigate('/')}>Show Anecdotes</button>
      <form onSubmit={handleSubmit}>
        <div>
        Content:
          <input {...content} /> {/* Spread the props from useField */}
        </div>
        <div>
          Author: 
          <input {... author} />
        </div>
        <div>
          url for more info: 
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

const App = () => {
  
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const match = useMatch('/anecdotes/:id')

  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  // const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      {/* <Menu /> */}
      {/* <AnecdoteList anecdotes={anecdotes} /> */}
      {/* <About /> */}
      {/* <CreateNew addNew={addNew} /> */}
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/create">createNewAnecdote</Link>
        {/* <Link style={padding} to="/users">users</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link style={padding} to="/login">login</Link>
        } */}
      </div>
      <Routes>
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} anecdotes={anecdotes} />} />
        {/* <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} /> */}
        {/* <Route path="/login" element={<Login onLogin={login} />} /> */}
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>
      <div>
        <br />
        {/* <About /> */}
        <Footer />
      </div>
    </div>
  )
}


export default App
