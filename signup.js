// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
 
  apiKey: "AIzaSyBbWsuH7t4H3U6Uuz7aBDsGNHrPub9EOik",
  authDomain: "my-project-2-40f25.firebaseapp.com",
  projectId: "my-project-2-40f25",
  storageBucket: "my-project-2-40f25.appspot.com",
  messagingSenderId: "930771698004",
  appId: "1:930771698004:web:d048d61b925103493c48c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const submit = document.getElementById('submit');
const login_submit = document.getElementById('login_submit');



// Fetch and log users from Firestore
const usernameSpan = document.getElementById('username');



// Fetch and log users when the script runs

// Function to fetch and log users


submit.addEventListener('click', async function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;
  

  try {
    console.log("Attempting to add document to Firestore...");

    const docRef = await addDoc(collection(db, "users"), {
      first: name,
      email: email,
      password: password,
      timestamp: Date.now()
    });
    
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  if (password !== "" && email !== "" && password.length >= 6) {
    try {
      console.log("Creating user with email and password...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('user-name', JSON.stringify(name));
      window.location.href = "home.html"
    } catch (error) {
      const errorMessage = error.message;
      console.error("Error creating user: ", errorMessage);
      alert("Error: " + errorMessage);
    }
  } else {
    alert("Enter a valid email and password of at least 6 characters.");
  }

  const username = document.getElementById('user-name');
  const stored_user_name = JSON.parse(localStorage.getItem('user-name'));
  username.innerText = stored_user_name;
});


login_submit.addEventListener('click', async function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    window.location.href = "home.html";
    
    // Additional actions after successful login
  } catch (error) {
    const errorMessage = error.message;
    console.error(errorMessage);
    alert("Error: " + errorMessage);
  }
 
  
 
});

