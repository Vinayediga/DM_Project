import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBbWsuH7t4H3U6Uuz7aBDsGNHrPub9EOik",
  authDomain: "my-project-2-40f25.firebaseapp.com",
  projectId: "my-project-2-40f25",
  storageBucket: "my-project-2-40f25.appspot.com",
  messagingSenderId: "930771698004",
  appId: "1:930771698004:web:d048d61b925103493c48c1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

const login_submit = document.getElementById("login_submit");

login_submit.addEventListener("click", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("name").value;
 

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update UI or perform actions after successful login
    const displayName = user.displayName;
    console.log(displayName);
    localStorage.setItem("user-name", JSON.stringify(displayName));
    window.location.href = "home.html";
    // Redirect to homepage after successful login
  } catch (error) {
    const errorMessage = error.message;
    alert(errorMessage);
  }
});

const forgotpassword = document.getElementById("Forgot-pass");
forgotpassword.addEventListener("click", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;

  try {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log(email);

        alert("password send to your email");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  } catch (error) {
    const errorMessage = error.message;
    alert(errorMessage);
  }
});
const google_login_btn = document.getElementById("google_login");
google_login_btn.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken; 
      const user = result.user;
      alert(`User logged in: ${JSON.stringify(user)}`);
      const displayName = user.displayName;
      console.log("User's display name:", displayName);

      localStorage.setItem('user-name', JSON.stringify(displayName));
      console.log(user);
      window.location.href = "home.html"
      
    })
    .catch((error) => {
     
      const errorCode = error.code;
      const errorMessage = error.message;
      
      const email = error.customData.email;
      
      const credential = GoogleAuthProvider.credentialFromError(error);
    
    });

  })
