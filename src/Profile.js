import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from './config/firebase-info'
import { collection, addDoc, query, orderBy, onSnapshot  } from 'firebase/firestore'
import './styles/chat.css'

export default function Profile() {

  const [list, setList] = useState([])
  const [text, setText] = useState('')
  
  const moviesCollection = collection(db, 'movies')

  const user = JSON.parse(localStorage.getItem('profile'))
  const navigate = useNavigate();

  
  function addNew(){
    if (text == ''){
      return
    }
    addDoc(moviesCollection ,{
      user: user[0],
      text: text,
      timestamp: new Date()
    })
    setText('')
  }

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
    });
  },[list])

  useEffect(() => {
    const shorted = query(moviesCollection, orderBy('timestamp')); // Add orderBy clause to sort by timestamp
    onSnapshot(shorted, (snapshot) => {
      setList(snapshot.docs.map((i) => ({ ...i.data(), id: i.id })))
    })

    if (!user){
      navigate('/login'); // Navigates to the '/about' route
    }
  },[])

  return (
    <div className='all'>
      <h1>welcome {user[0]}</h1>
      <button><Link to="/login" onClick={() => localStorage.setItem('profile', false)}>log Out</Link></button>
      {list.map((i) => {
        return (
          <div key={i.id}>
            <h4>{i.user}</h4>
            <p>{i.text}</p>
          </div>
        )
        })}
      <input value={text} onChange={(e) => setText(e.target.value)}/>
      <button onClick={addNew}>send</button>  
    </div>
  )
}
