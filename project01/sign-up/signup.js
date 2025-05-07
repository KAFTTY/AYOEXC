// btc price API
async function fetchBitcoinPrice() {
  const priceEl = document.getElementById('btc-price');

  try {
    // Start fade out
    priceEl.classList.add('hidden');

    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const data = await response.json();
    const price = data.bitcoin.usd;

    // Wait for fade out, then update and fade in
    setTimeout(() => {
      priceEl.textContent = `$${price.toLocaleString()}`;
      priceEl.classList.remove('hidden');
    }, 300);
  } catch (error) {
    priceEl.textContent = 'Error loading price';
    priceEl.classList.remove('hidden');
    console.error('Bitcoin fetch failed:', error);
  }
}
fetchBitcoinPrice();
setInterval(fetchBitcoinPrice, 5000);

// form validation
const signupForm = document.getElementById('signupForm');
const popup = document.getElementById('popup');
const loader = document.getElementById('loader');
const closePopup = document.getElementById('closePopup');

// When the form is submitted
signupForm.addEventListener('submit', function (e) {
  e.preventDefault();

  showLoader();

  setTimeout(() => {
    hideLoader();
    popup.style.display = 'flex';

    // Auto-close popup after 3 seconds
    setTimeout(() => {
      closePopupFunction();
    }, 3000);
    
  }, 2000); // Show popup after loading spinner for 2 seconds
});

// Manual close by button
closePopup.addEventListener('click', closePopupFunction);

// Functions
function showLoader() {
  loader.style.display = 'flex';
}

function hideLoader() {
  loader.style.display = 'none';
}

function closePopupFunction() {
  popup.style.display = 'none';
  signupForm.reset();
  window.location.href = '../index.html'; // Redirect after signup
}

// password validation
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const passwordMessage = document.getElementById('passwordMessage');
const signupForms = document.getElementById('signupForm');

function validatePasswords() {
    if (password.value === confirmPassword.value) {
        passwordMessage.textContent = 'passwords match';
        passwordMessage.style.color = 'green';
        return true;
    }else {
        passwordMessage.textContent = 'passwords do not match'
        passwordMessage.style.color ='red';
        return false
    }
}

// password match
password.addEventListener('input', validatePasswords);
confirmPassword.addEventListener('input', validatePasswords);

signupForm.addEventListener('submit', function (e) {
    if (!validatePasswords()) {
        e.preventDefault();
        alert('Please ensure the passwords match');
    }
});

const submitButton = document.querySelector('.btn-green');

function toggleSubmitButton() {
    submitButton.disabled = !validatePasswords();
}

password.addEventListener('input', toggleSubmitButton);
confirmPassword.addEventListener('input', toggleSubmitButton)

// password strenght
function isStrongPassword(pw) {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return pattern.test(pw)
}

password.addEventListener('input', function () {
    if (!isStrongPassword(password.value)) {
        passwordMessage.textContent = 
        'password must be at least 8 characters long and include uppercase, lowercase, and a number.';
        passwordMessage.style.color = 'orange';
    } else {
        passwordMessage.textContent = '';
    }
});

