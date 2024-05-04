import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBAjRsZzpap8lUdIH90LBiufyjDjP1T_wQ",
  authDomain: "tapop-e3bf5.firebaseapp.com",
  projectId: "tapop-e3bf5",
  storageBucket: "tapop-e3bf5.appspot.com",
  messagingSenderId: "1079088249549",
  appId: "1:1079088249549:web:4ac6f5c4000124358e8784",
  measurementId: "G-W77CNMSEKP"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const provider = new GoogleAuthProvider();