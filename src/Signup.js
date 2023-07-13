import React, { useEffect, useState } from 'react'
import { auth, googleProvider } from './config/firebase-info'
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from 'firebase/auth'

export default function Signup() {

  const [email, setEmail] = useState('')
  const [pas1, setPas1] = useState('')
  const [pas2, setPas2] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  
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
        
        if (err.code ==  'auth/weak-password') {
            setError('Password must have 6 or more characters')
        } else if (err.code == 'auth/email-already-in-use') {
            setError('Account already exist')
        } else if (err.code == 'auth/invalid-email') {
          setError('Invalid email')
        }   else if (err.code == 'auth/missing-password') {
          setError('Missing password')
        }

        console.error(err)
      }
    } else {
      setError('Password is not matching')
    } 
  }
 
  async function signInWithGoogle() {
    try {
        await signInWithPopup(auth, googleProvider);
        navigate('/profile')
        
      } catch (error) {
        // Handle login error
        console.log('Signin error:', error);
      }
  }

  return (    
    <div className='all-auth'>
      <h1>Sign Up</h1>
      <form className='auth-form' onSubmit={handlesubmit}>
        <div className='error' style={{ display: error === '' ? 'none' : 'flex' }}>{error}</div>
        <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type='password' placeholder='password' value={pas1} onChange={(e) => setPas1(e.target.value)}/>
        <input type='password' placeholder='config password' value={pas2} onChange={(e) => setPas2(e.target.value)}/>
        <button type='submit'>Signup</button>
      </form>
      
      <div className='login-google-div'>
            <button className='login-google-button' onClick={signInWithGoogle}>
              <img className='login-google' width="48" height="48" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>
            </button>
      </div>
      <div>You already have an account? 
        <Link to="/login">logIn</Link>
      </div>
    </div>
  )
}
