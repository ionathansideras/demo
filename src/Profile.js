import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from './config/firebase-info'
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore'

export default function Profile() {

  const [list, setList] = useState([])

  const moviesCollection = collection(db, 'movies')

  const user = JSON.parse(localStorage.getItem('profile'))
  const navigate = useNavigate();

  async function getMovies(){
    const data = await getDocs(moviesCollection)
    const movieInfo = data.docs.map((i) => ({...i.data(), id: i.id}))
    setList(movieInfo)
  }

  function addNew(){
    addDoc(moviesCollection ,{
      title: 'yolo',
      releaseDate: 2023
    })
    getMovies()
  }

  async function deleteMovie(id){
    const delDocument = doc(db, 'movies', id)
    await deleteDoc(delDocument)
    getMovies()
  }

  useEffect(() => {
      getMovies()

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
          <p>{i.title}</p>
          <p>{i.releaseDate}</p>
          <button onClick={() => deleteMovie(i.id)}>delete</button>
          </div>
        )
        })}
      <button onClick={addNew}>add</button>
    </div>
  )
}
