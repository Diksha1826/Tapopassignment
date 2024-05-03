import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { initializeApp } from 'firebase/app'; // Import initializeApp from Firebase
// import { firebaseConfig } from './utils/firebaseconfig'; // Import your Firebase configuration
import reportWebVitals from './reportWebVitals';

// Initialize Firebase
// initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
