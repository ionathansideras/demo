import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "./config/firebase-info";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState(""); // State to store the email input
  const [pas1, setPas1] = useState(""); // State to store the first password input
  const [pas2, setPas2] = useState(""); // State to store the second password input
  const [error, setError] = useState(""); // State to store error messages

  const navigate = useNavigate(); // React Router's navigation hook

  // Function to handle the form submission
  async function handlesubmit(e) {
    e.preventDefault();
    if (pas1 === pas2) {
      try {
        // Create a new user with the provided email and password
        await createUserWithEmailAndPassword(auth, email, pas1);

        // Sign out the user after successful signup to force them to log in again
        await signOut(auth);

        // Clear the input fields and error messages after successful signup
        setEmail("");
        setPas1("");
        setPas2("");
      } catch (err) {
        // Handle signup errors
        if (err.code === "auth/weak-password") {
          setError("Password must have 6 or more characters");
        } else if (err.code === "auth/email-already-in-use") {
          setError("Account already exists with this email");
        } else if (err.code === "auth/invalid-email") {
          setError("Invalid email");
        } else if (err.code === "auth/missing-password") {
          setError("Missing password");
        } else if (err.code === "auth/missing-email") {
          setError("Missing email");
        }
        console.error(err);
      }
    } else {
      setError("Passwords do not match");
    }
  }

  // Function to handle Google sign-in
  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/profile");
    } catch (error) {
      // Handle login error
      console.log("Sign-in error:", error);
    }
  }

  return (
    <div className="all-auth">
      <h1>Sign Up</h1>
      <form className="auth-form" onSubmit={handlesubmit}>
        <div
          className="error"
          style={{ display: error === "" ? "none" : "flex" }}
        >
          {/* Display error messages */}
          {error}
        </div>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={pas1}
          onChange={(e) => setPas1(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={pas2}
          onChange={(e) => setPas2(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>

      <div className="login-google-div">
        {/* Button for Google sign-in */}
        <button className="login-google-button" onClick={signInWithGoogle}>
          <img
            className="login-google"
            width="48"
            height="48"
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="google-logo"
          />
        </button>
      </div>
      <div>
        {/* Link to the login page */}
        You already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}
