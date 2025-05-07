const supportForm = document.querySelector('.support-form');
const supportPopup = document.getElementById('supportPopup');

if (supportForm) {
  supportForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(supportForm);

    fetch('https://formspree.io/f/manoqdgr', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        supportForm.reset();
        supportPopup.style.display = 'flex';
        setTimeout(() => {
          closeSupportPopup();
        }, 3000);
      } else {
        alert('Something went wrong. Please try again.');
      }
    })
    .catch(error => {
      alert('Error submitting form. Please try again.');
    });
  });
}

function closeSupportPopup() {
  supportPopup.style.display = 'none';
}
