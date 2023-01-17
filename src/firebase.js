// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, getRedirectResult } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwL8dUY9PUUTwFAe9zFZBS9n7wjMHGHTM",
  authDomain: "github-api-7eea8.firebaseapp.com",
  databaseURL: "https://github-api-7eea8-default-rtdb.firebaseio.com",
  projectId: "github-api-7eea8",
  storageBucket: "github-api-7eea8.appspot.com",
  messagingSenderId: "485242702086",
  appId: "1:485242702086:web:682984807033ac4a973687",
  measurementId: "G-VTT13EWYJF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
console.log("hello")

// connectAuthEmulator(auth, "http://127.0.0.1:5555");
// connectFirestoreEmulator(db, "127.0.0.1", "5050");

export { db, auth };
