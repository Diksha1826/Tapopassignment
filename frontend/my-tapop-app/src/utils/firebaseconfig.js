import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

// import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCE3Uo07FwMLMRlQMRFROSL3YJhG0Ysnss",
//   authDomain: "netflix-mern-project-8b7b5.firebaseapp.com",
//   projectId: "netflix-mern-project-8b7b5",
//   storageBucket: "netflix-mern-project-8b7b5.appspot.com",
//   messagingSenderId: "324317602419",
//   appId: "1:324317602419:web:04f8591d4150e81dbf4006",
//   measurementId: "G-X6CC2J6T4C"
// };

// const app = initializeApp(firebaseConfig);
// export const firebaseAuth = getAuth(app);