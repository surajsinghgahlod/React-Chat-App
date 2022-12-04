import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMTPSG23DKzg0ZqlcYACMryIdW8Mu8p6M",
  authDomain: "react-messenger-33a5e.firebaseapp.com",
  databaseURL: "https://react-messenger-33a5e-default-rtdb.firebaseio.com",
  projectId: "react-messenger-33a5e",
  storageBucket: "react-messenger-33a5e.appspot.com",
  messagingSenderId: "606555197278",
  appId: "1:606555197278:web:55b1cfb9fb4f6373e289cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
