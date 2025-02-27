// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnU8GqYmceuQyXbK5O7BtzQDyZNMCD4T0",
  authDomain: "netflix-clone-1b953.firebaseapp.com",
  projectId: "netflix-clone-1b953",
  storageBucket: "netflix-clone-1b953.firebasestorage.app",
  messagingSenderId: "1060044205014",
  appId: "1:1060044205014:web:cf4f3010676aa7aff6d277",
  measurementId: "G-8KCXP5T2KX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
 
export {auth}