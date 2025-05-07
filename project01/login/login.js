
// Target elements
const loginForm = document.getElementById('loginForm');
const successPopup = document.getElementById('successPopup');
const loader = document.getElementById('loader');

// Simulated user
const user = {
  email: "kasumufraklin@gmail.com",
  password: "password123"
};

// Handle form submit
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const emailInput = document.getElementById('email').value.trim();
  const passwordInput = document.getElementById('password').value.trim();

  if (emailInput === user.email && passwordInput === user.password) {
    showLoader();
    setTimeout(() => {
      hideLoader();
      showPopup();
    }, 2000); // 2 seconds loading
  } else {
    alert("Invalid email or password!");
  }
});

// Show Loader
function showLoader() {
  loader.style.display = "flex";
}

// Hide Loader
function hideLoader() {
  loader.style.display = "none";
}

// Show Success Popup
function showPopup() {
  successPopup.style.display = "flex";
  // Auto close popup after 3 seconds
  setTimeout(() => {
    closePopup();
  }, 3000);
}


// Close Popup
function closePopup() {
  successPopup.style.display = "none";
  window.location.href = "../index.html"; // Redirect after success
}