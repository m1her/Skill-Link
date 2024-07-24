// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "skill-link-98004.firebaseapp.com",
  projectId: "skill-link-98004",
  storageBucket: "skill-link-98004.appspot.com",
  messagingSenderId: "239377851213",
  appId: "1:239377851213:web:039e39ca97b32552324d04",
  measurementId: "G-QYZCD5GM8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
