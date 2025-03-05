// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA6OsJYJCKQAfuXdBR6q2fkNNf-iyrwKc",
  authDomain: "react-cursos-49014.firebaseapp.com",
  projectId: "react-cursos-49014",
  storageBucket: "react-cursos-49014.firebasestorage.app",
  messagingSenderId: "70648614161",
  appId: "1:70648614161:web:f7747ba78b9cdaa82190b0"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp )