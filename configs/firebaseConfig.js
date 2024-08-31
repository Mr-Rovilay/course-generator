// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBIC_FIREBASE_API_KEY,
  authDomain: "link-shearing-app.firebaseapp.com",
  projectId: "link-shearing-app",
  storageBucket: "link-shearing-app.appspot.com",
  messagingSenderId: "856553980086",
  appId: "1:856553980086:web:596c9f4f05e3626097a617",
  measurementId: "G-0WCVT927ZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
