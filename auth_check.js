import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBeikKDwccT4RmrxPsJJPGahogCmncEk4A",
  authDomain: "fir-1ec73.firebaseapp.com",
  projectId: "fir-1ec73",
  storageBucket: "fir-1ec73.firebasestorage.app",
  messagingSenderId: "381023647237",
  appId: "1:381023647237:web:cfbf9a9a020af603f60e6c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  const nav = document.querySelector('.navigation');
  const existingProfile = document.getElementById('profile-pic');
  
  // Remove the existing profile if any
  if (existingProfile) existingProfile.remove();

  // Hide login buttons if user is logged in
  document.querySelectorAll('.navigation a').forEach(link => {
    if (link.textContent.toLowerCase().includes('login')) {
      link.style.display = 'none';
    }
  });

  if (user) {
    // Create profile image
    const img = document.createElement("img");
    img.src = user.photoURL;
    img.alt = "Profile";
    img.id = "profile-pic";
    img.style.width = "40px";
    img.style.height = "40px";
    img.style.borderRadius = "50%";
    img.style.marginLeft = "20px";
    img.style.cursor = "pointer";

    // Sign Out Button
    const signOutBtn = document.createElement("a");
    signOutBtn.href = "#";
    signOutBtn.textContent = "Sign Out";
    signOutBtn.style.marginLeft = "10px";
    signOutBtn.onclick = async () => {
      await signOut(auth);
      location.reload();  // Refresh to show updated UI
    };

    nav.appendChild(img);
    nav.appendChild(signOutBtn);
  }
});
