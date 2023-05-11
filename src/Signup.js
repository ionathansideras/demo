import React, { useState } from 'react'
import { auth } from './config/firebase-info'
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { Link } from "react-router-dom";

export default function Signup() {

  const [email, setEmail] = useState('')
  const [pas1, setPas1] = useState('')
  const [pas2, setPas2] = useState('')

  async function handlesubmit(e){
    e.preventDefault()
    if (pas1 === pas2){
      try {
        await createUserWithEmailAndPassword(auth, email, pas1)
        await signOut(auth)
        setEmail('')
        setPas1('')
        setPas2('')
      } catch (err) {
        console.error(err)
      }
    } else {
      console.log('DIF PASSWORDS')
    } 
  }

  return (    
    <div>
      <h1>Sign Up</h1>
        <form onSubmit={handlesubmit}>
          <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type='password' placeholder='password' value={pas1} onChange={(e) => setPas1(e.target.value)}/>
          <input type='password' placeholder='config password' value={pas2} onChange={(e) => setPas2(e.target.value)}/>
          <button type='submit'>Signup</button>
        </form>

      <div>Already have an accound? 
        <Link to="/login">log in</Link>
      </div>
    </div>
  )
}
