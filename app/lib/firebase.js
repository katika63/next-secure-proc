// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCURO4W_RXvCm0EVP7LfbhXcWwfachhbxI",
  authDomain: "btmsecurity.firebaseapp.com",
  databaseURL: "https://btmsecurity-default-rtdb.firebaseio.com",
  projectId: "btmsecurity",
  storageBucket: "btmsecurity.appspot.com",
  messagingSenderId: "911223177620",
  appId: "1:911223177620:web:e8614fd2d8db14c637cf81",
  measurementId: "G-S0NB017JG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

export { database, ref, push, set };