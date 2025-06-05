
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBnU8GqYmceuQyXbK5O7BtzQDyZNMCD4T0",
//   authDomain: "netflix-clone-1b953.firebaseapp.com",
//   projectId: "netflix-clone-1b953",
//   storageBucket: "netflix-clone-1b953.firebasestorage.app",
//   messagingSenderId: "1060044205014",
//   appId: "1:1060044205014:web:cf4f3010676aa7aff6d277",
//   measurementId: "G-8KCXP5T2KX"
// };


// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
 
// export { auth }



// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//   apiKey: "AIzaSyBnU8GqYmceuQyXbK5O7BtzQDyZNMCD4T0",
//   authDomain: "netflix-clone-1b953.firebaseapp.com",
//   projectId: "netflix-clone-1b953",
//   storageBucket: "netflix-clone-1b953.firebasestorage.app",
//   messagingSenderId: "1060044205014",
//   appId: "1:1060044205014:web:cf4f3010676aa7aff6d277",
//   measurementId: "G-8KCXP5T2KX"
// };


// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// export { auth, db };


// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//   apiKey: "AIzaSyBnU8GqYmceuQyXbK5O7BtzQDyZNMCD4T0",
//   authDomain: "netflix-clone-1b953.firebaseapp.com",
//   projectId: "netflix-clone-1b953",
//   storageBucket: "netflix-clone-1b953.firebasestorage.app",
//   messagingSenderId: "1060044205014",
//   appId: "1:1060044205014:web:cf4f3010676aa7aff6d277",
//   measurementId: "G-8KCXP5T2KX"
// };


// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// export { auth, db };


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getFunctions } from "firebase/functions"; // Import Functions

// Your web app's Firebase configuration
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
const db = getFirestore(app); // Initialize Firestore
const functions = getFunctions(app); // Initialize Functions

export { auth, db, functions }; // Export functions
