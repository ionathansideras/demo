import React, { useState } from 'react';
import { auth } from './config/firebase-info';
import { signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom'


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  localStorage.setItem('profile', false)

  async function handleSubmit(e) {
    e.preventDefault();
    try {
        const userCredential = await signInWithEmailAndPassword(auth,email,password);
        const user = userCredential.user;
        localStorage.setItem('profile', JSON.stringify([user.email, user.uid]))

        navigate('/profile')
      } catch (error) {
        // Handle login error
        console.log('Login error:', error);
      }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}