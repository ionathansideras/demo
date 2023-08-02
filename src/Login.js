import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "./config/firebase-info";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  // State to store user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // React Router's navigation hook
  const navigate = useNavigate();

  // Handle regular email and password login
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      navigate("/profile", { state: { user: user.email } });
    } catch (err) {
      // Handle login error
      // Map Firebase error codes to user-friendly messages
      if (err.code === "auth/user-not-found") {
        setError("Account not found. Please check your email and password.");
      } else if (err.code === "auth/wrong-password") {
        setError("Wrong password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email. Please enter a valid email address.");
      } else if (err.code === "auth/missing-password") {
        setError("Missing password. Please enter your password.");
      }

      console.error(err);
    }
  }

  // Handle Google sign-in
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
      <h1>Login</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div
          className="error"
          style={{ display: error === "" ? "none" : "flex" }}
        >
          {error}
        </div>

        {/* Input fields for email and password */}
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
        {/* Submit button for regular login */}
        <button type="submit">Login</button>
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
        {/* Link to sign-up page */}
        You don't have an account? <Link to="/">Sign Up</Link>
      </div>
    </div>
  );
}
