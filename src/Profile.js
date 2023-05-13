import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from './config/firebase-info'
import { getDocs, collection, addDoc, deleteDoc, doc, query, orderBy  } from 'firebase/firestore'

export default function Profile() {

  const [list, setList] = useState([])
  const [text, setText] = useState('')

  const moviesCollection = collection(db, 'movies')

  const user = JSON.parse(localStorage.getItem('profile'))
  const navigate = useNavigate();

  async function getTexts(){
    const shorted = query(moviesCollection, orderBy('timestamp')); // Add orderBy clause to sort by timestamp
    const data = await getDocs(shorted)
    const movieInfo = data.docs.map((i) => ({...i.data(), id: i.id}))
    setList(movieInfo)
  }

  
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
    getTexts()
  }

  async function deleteText(id){
    const delDocument = doc(db, 'movies', id)
    await deleteDoc(delDocument)
    getTexts()
  }

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  },[list])

  useEffect(() => {
    getTexts()
    if (!user){
      navigate('/login'); // Navigates to the '/about' route
    }
  },[])


  return (
    <div>
      <h1>welcome {user[0]}</h1>
      <button><Link to="/login">log Out</Link></button>
      {list.map((i) => {
        return (
          <div key={i.id}>
            <h4>{i.user}</h4>
            <p>{i.text}</p>
            {user[0] === i.user ? <button onClick={() => deleteText(i.id)}>delete</button> : <div></div>}
          </div>
        )
        })}
      <input value={text} onChange={(e) => setText(e.target.value)}/>
      <button onClick={addNew}>send</button>  
    </div>
  )
}
