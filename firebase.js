import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKv-v7r9p8-eKi5PishnWrglEeKKz1ens",
  authDomain: "medi-alert-90d54.firebaseapp.com",
  projectId: "medi-alert-90d54",
  storageBucket: "medi-alert-90d54.firebasestorage.app",
  messagingSenderId: "613292667353",
  appId: "1:613292667353:web:5ec1bb17c32118195ce9c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 

// Select the form using the class from your HTML
const signupForm = document.querySelector('.auth-form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const fullName = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Manual check for password matching before sending to Firebase
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      
      // Update the user's display name
      return updateProfile(user, {
        displayName: fullName
      });
    })
    .then(() => {
      console.log("Account created for:", auth.currentUser.displayName);
      window.location.href = 'location.html';
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert(error.message);
    });
});
