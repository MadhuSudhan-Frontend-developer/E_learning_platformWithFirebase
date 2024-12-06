// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAen9WBSXEcl2oEr3GjYeEurjCq9-Rjvdg",
  authDomain: "authentication-app-2a73a.firebaseapp.com",
  databaseURL: "https://authentication-app-2a73a-default-rtdb.firebaseio.com",
  projectId: "authentication-app-2a73a",
  storageBucket: "authentication-app-2a73a.firebasestorage.app",
  messagingSenderId: "327865275155",
  appId: "1:327865275155:web:554eb12879ed549ad3c0e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Toggle between Sign Up and Login forms
function toggleForms() {
  const signupContainer = document.getElementById('signup-container');
  const loginContainer = document.getElementById('login-container');
  if (signupContainer.style.display === 'none') {
    signupContainer.style.display = 'block';
    loginContainer.style.display = 'none';
  } else {
    signupContainer.style.display = 'none';
    loginContainer.style.display = 'block';
  }
}

// Event listeners for form toggling
document.getElementById('show-login').addEventListener('click', (e) => {
  e.preventDefault();
  toggleForms();
});

document.getElementById('show-signup').addEventListener('click', (e) => {
  e.preventDefault();
  toggleForms();
});

// Sign Up form submission
document.getElementById('signup-form').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const phone = document.getElementById('signup-phone').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      set(ref(db, 'users/' + user.uid), {
        name: name,
        email: email,
        phone: phone
      });
      alert('Sign Up Successful!');
      document.getElementById('signup-form').reset();
      toggleForms();
    })
    .catch(error => {
      alert(error.message);
    });
});

// Login form submission
document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert('Login Successful!');
      window.location.href = 'home.html'; // Redirect to home page
    })
    .catch(error => {
      alert(error.message);
    });
});
