// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyD3egNfXrCPbw39gBTWzFHGuW54L2NrpOs",
//   authDomain: "fittrack-9d519.firebaseapp.com",
//   projectId: "gen-lang-client-0390563758",
//   storageBucket: "fittrack-9d519.firebasestorage.app",
//   messagingSenderId: "452284629581",
//   appId: "1:452284629581:web:0e73da330d7c787f351204",
//   measurementId: "G-YPP92TB1NG"
// };

// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
