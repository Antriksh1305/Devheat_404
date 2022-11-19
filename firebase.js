import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDkRMOogTQ77vko4sEYY_AjJxP1D-_oHjs",
  authDomain: "team404-200.firebaseapp.com",
  databaseURL: "https://team404-200-default-rtdb.firebaseio.com/",
  projectId: "team404-200",
  storageBucket: "team404-200.appspot.com",
  messagingSenderId: "375353537676",
  appId: "1:375353537676:web:733d65e1a80785f376f7a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;