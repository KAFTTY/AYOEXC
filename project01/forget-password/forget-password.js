// Targets
const resetForm = document.getElementById('resetForm');
const resetPopup = document.getElementById('resetPopup');
const loader = document.getElementById('loader');

// Handle form submit
resetForm.addEventListener('submit', function(e) {
  e.preventDefault();

  showLoader();

  // Simulate loading for 2 seconds
  setTimeout(() => {
    hideLoader();
    showPopup();
  }, 2000);
});

// Show loader
function showLoader() {
  loader.style.display = 'flex';
}

// Hide loader
function hideLoader() {
  loader.style.display = 'none';
}

// Show popup
function showPopup() {
  resetPopup.style.display = 'flex';

  // Auto close popup after 3 seconds
  setTimeout(() => {
    closePopup();
  }, 3000);
}

// Close popup manually
function closePopup() {
  resetPopup.style.display = 'none';
  window.location.href = "index.html"; // Redirect dashbord
}
