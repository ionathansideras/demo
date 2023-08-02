import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "./config/firebase-info";
import { signOut, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import "./styles/chat.css";

export default function Profile() {
  const [list, setList] = useState([]); // State to store the list of messages
  const [text, setText] = useState(""); // State to store the user's text input

  let flag = true; // Flag to handle username parsing

  const moviesCollection = collection(db, "chat"); // Reference to the "chat" collection in Firebase Firestore

  const navigate = useNavigate(); // React Router's navigation hook

  // Extract the username from the current user's email
  let username = auth?.currentUser?.email;
  if (username) {
    username = username
      .split("")
      .map((i) => {
        if (i == "@") {
          flag = false;
          return;
        } else if (flag == true) {
          return i;
        }
      })
      .join("");
  }

  // Function to add a new message to the Firestore collection
  function addNew(e) {
    e.preventDefault();
    if (text == "") {
      return;
    }
    addDoc(moviesCollection, {
      user: username,
      text: text,
      timestamp: new Date(),
    });
    setText("");
  }

  // Scroll to the bottom of the message list whenever it updates
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
    });
  }, [list]);

  // Subscribe to changes in the Firestore collection and update the message list accordingly
  useEffect(() => {
    const shorted = query(moviesCollection, orderBy("timestamp")); // Add orderBy clause to sort by timestamp
    onSnapshot(shorted, (snapshot) => {
      setList(snapshot.docs.map((i) => ({ ...i.data(), id: i.id })));
    });
  }, []);

  // Check if the user is authenticated. If not, navigate to the login page.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.email == undefined) {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="all">
      <header>
        {/* Button to log out */}
        <button onClick={() => signOut(auth)}>log Out</button>
        {/* Display the user's username */}
        <h3>Welcome {username} </h3>
      </header>
      {/* Display the list of messages */}
      {list.map((i) => {
        return (
          <article className={i.user == username ? "right" : "left"} key={i.id}>
            <div className={i.user == username ? "myMessege" : "messege"}>
              {/* Display the sender's name */}
              <h4 className="name">{i.user}</h4>
              {/* Display the message text */}
              <p className="text">{i.text}</p>
            </div>
          </article>
        );
      })}
      {/* Form for typing and sending a new message */}
      <form className="type-form" onSubmit={addNew}>
        <input
          placeholder="Type..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </div>
  );
}
