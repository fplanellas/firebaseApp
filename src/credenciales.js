// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbr_zjKu6UqxDnQ2qHrO2rKZ-00U80qwo",
  authDomain: "tutorial-firebase-09.firebaseapp.com",
  projectId: "tutorial-firebase-09",
  storageBucket: "tutorial-firebase-09.appspot.com",
  messagingSenderId: "254342125715",
  appId: "1:254342125715:web:a0b79f0cc7812d627e1566"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;