
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase ,set, ref } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
 
const firebaseConfig = {
    apiKey: "AIzaSyCyM4t2c5GLVJ4MR1SCgIbi-HCtwyEQNqI",
    authDomain: "psiconnect-app.firebaseapp.com",
    databaseURL: "https://psiconnect-app-default-rtdb.firebaseio.com",
    projectId: "psiconnect-app",
    storageBucket: "psiconnect-app.appspot.com",
    messagingSenderId: "302608307954",
    appId: "1:302608307954:web:cab2d2d42f22537e10626b",
    measurementId: "G-XL8E2389ES"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, set, ref };
