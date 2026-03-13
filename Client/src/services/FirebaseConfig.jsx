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
  apiKey: "AIzaSyBMGNgP9S79sZOv0NIl8sa7Z74zLwNv1HE",
  authDomain: "gen-lang-client-0390563758.firebaseapp.com",
  projectId: "gen-lang-client-0390563758",
  storageBucket: "gen-lang-client-0390563758.firebasestorage.app",
  messagingSenderId: "343561990364",
  appId: "1:343561990364:web:7a3cfe82c75326755d4419",
  measurementId: "G-RE1X8GZPYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
