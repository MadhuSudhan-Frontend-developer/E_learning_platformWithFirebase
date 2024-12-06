const firebaseConfig = {
    apiKey: "AIzaSyAen9WBSXEcl2oEr3GjYeEurjCq9-Rjvdg",
    authDomain: "authentication-app-2a73a.firebaseapp.com",
    databaseURL: "https://authentication-app-2a73a-default-rtdb.firebaseio.com",
    projectId: "authentication-app-2a73a",
    storageBucket: "authentication-app-2a73a.appspot.com",
    messagingSenderId: "327865275155",
    appId: "1:327865275155:web:554eb12879ed549ad3c0e6"
  };

 
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.database();
  
  // Function to update profile modal with user details
  function updateProfileModal(user) {
    if (user) {
      db.ref('users/' + user.uid).once('value').then(snapshot => {
        const userData = snapshot.val();
        
        document.getElementById('profileName').innerText = userData.name || 'N/A';
        document.getElementById('profileEmail').innerText = user.email || 'N/A';
        document.getElementById('profileImage').src = userData.profileImage || 'default-profile.png';
      }).catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }
  
  // Firebase Google Sign-In
  function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    document.getElementById('profileName').innerText = profile.getName();
    document.getElementById('profileEmail').innerText = profile.getEmail();
    document.getElementById('profileImage').src = profile.getImageUrl();
    
    $('#gmailProfileModal').modal('hide');
  }
  
  // Handle user state changes
  auth.onAuthStateChanged(user => {
    if (user) {
      updateProfileModal(user);
    }
  });
  
  // Handle form search
  function searchCourse() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    console.log('Search for:', query);
    return false; // Prevent default form submission
  }
  
  // Handle profile button click to show profile modal
  document.querySelector('[data-toggle="modal"]').addEventListener('click', function() {
    const user = auth.currentUser;
    if (user) {
      updateProfileModal(user);
    }
  });
  