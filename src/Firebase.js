// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2NfGCnsCA7RgY4IhIwm1TgvhzFaegW6A",
  authDomain: "my-personal-todolist.firebaseapp.com",
  projectId: "my-personal-todolist",
  storageBucket: "my-personal-todolist.appspot.com",
  messagingSenderId: "473835008008",
  appId: "1:473835008008:web:86541be8afefbc30d061bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);