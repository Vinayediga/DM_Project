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

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const displayName = user.displayName;
    console.log("User's display name:", displayName);
    localStorage.setItem("user-name", JSON.stringify(displayName));
    window.location.href = "home.html";
  } catch (error) {
    console.error("Error during login:", error);
    alert(error.message);
  }
});

const forgotpassword = document.getElementById("Forgot-pass");
forgotpassword.addEventListener("click", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent to your email address.");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    alert(error.message);
  }
});

const google_login_btn = document.getElementById("google_login");
google_login_btn.addEventListener("click", async function () {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    alert(`User logged in: ${JSON.stringify(user)}`);
    const displayName = user.displayName;
    localStorage.setItem('user-name', JSON.stringify(displayName));
    window.location.href = "home.html";
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    alert(error.message);
  }
});
