import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from './config/firebase-info';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
        const userCredential = await signInWithEmailAndPassword(auth,email,password);
        const user = userCredential.user;
        navigate('/profile', { state: { user: user.email } })
      } catch (err) {
        // Handle login error
        if (err.code == 'auth/user-not-found') {
            setError('Account not found')
        } else if (err.code == 'auth/wrong-password') {
          setError('Wrong password')
        } else if (err.code == 'auth/invalid-email') {
          setError('Invalid email')
        }  else if (err.code == 'auth/missing-password') {
          setError('Missing password')
        }

        console.error(err)
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
    <div  className='all-auth'>
      <h1>Login</h1>
      <form  className='auth-form' onSubmit={handleSubmit}>
      <div className='error' style={{ display: error === '' ? 'none' : 'flex' }}>{error}</div>

        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <div className='login-google-div'>
            <button className='login-google-button' onClick={signInWithGoogle}>
              <img className='login-google' width="48" height="48" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>
            </button>
      </div>
      <div>You dont have an account? 
        <Link to="/">SignUp</Link>
      </div>
    </div>
  );
}