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
  const [list, setList] = useState([]);
  const [text, setText] = useState("");

  let flag = true;

  const moviesCollection = collection(db, "chat");

  const navigate = useNavigate();

  // const location = useLocation();
  // let { user } = location.state || {};

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

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
    });
  }, [list]);

  useEffect(() => {
    const shorted = query(moviesCollection, orderBy("timestamp")); // Add orderBy clause to sort by timestamp
    onSnapshot(shorted, (snapshot) => {
      setList(snapshot.docs.map((i) => ({ ...i.data(), id: i.id })));
    });
  }, []);

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
        <button onClick={() => signOut(auth)}>log Out</button>
        <h3>Welcome {username} </h3>
      </header>
      {list.map((i) => {
        return (
          <article className={i.user == username ? "right" : "left"} key={i.id}>
            <div className={i.user == username ? "myMessege" : "messege"}>
              <h4 className="name">{i.user}</h4>
              <p className="text">{i.text}</p>
            </div>
          </article>
        );
      })}
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
