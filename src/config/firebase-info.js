// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGe13lyAUkTDkqHOJue3OvkEqOMer2sRI",
  authDomain: "fir-app-6e142.firebaseapp.com",
  projectId: "fir-app-6e142",
  storageBucket: "fir-app-6e142.appspot.com",
  messagingSenderId: "881062531280",
  appId: "1:881062531280:web:297ce38f070be2dd6c8ed5",
  measurementId: "G-MTEQKZGFYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)