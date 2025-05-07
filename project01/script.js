document.addEventListener('DOMContentLoaded', function () {
  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Preloader
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }, 3000);

  // Testimonial Autoplay
  const slider = document.getElementById('testimonialSlides');
  const cards = slider ? slider.querySelectorAll('.testimonial-card') : [];
  let current = 0;

  function showSlide(index) {
    if (slider) {
      slider.style.transform = `translateX(-${index * 100}%)`;
    }
  }

  if (cards.length > 0) {
    setInterval(() => {
      current = (current + 1) % cards.length;
      showSlide(current);
    }, 3000);

    showSlide(current);
  }

});

// Scroll Reveal (This one should NOT be inside DOMContentLoaded)
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);

//exchange rate APIs starts
async function fetchUSDtoNGN() {
  const rateEl = document.getElementById('usd-ngn-rate');
  const API_KEY = 'f7abb87390ccba13a5ab81ba'; 

  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
    const data = await response.json();

    const rate = data.conversion_rates.NGN;
    rateEl.textContent = `₦${rate.toLocaleString()}`;
  } catch (error) {
    console.error('Failed to fetch NGN rate:', error);
    rateEl.textContent = 'Rate unavailable';
  }
}

fetchUSDtoNGN();
setInterval(fetchUSDtoNGN, 10000);
// APIs ends

// Blog APIs start
async function loadBlogPosts() {
  const container = document.getElementById('blog-posts');

  try {
    const response = await fetch('https://techcrunch.com/wp-json/wp/v2/posts?per_page=3');
    const posts = await response.json();

    let output = '';
    posts.forEach(post => {
      output += `
        <div class="blog-post">
          <h3>${post.title.rendered}</h3>
          <p>${post.excerpt.rendered.replace(/<[^>]+>/g, '')}</p>
          <a href="${post.link}" target="_blank" style="color: black; font-weight: bold;">Read more</a>
        </div>
      `;
    });

    container.innerHTML = output;
  } catch (err) {
    console.error('Failed to load blog posts:', err);
    container.innerHTML = '<p>Unable to load articles at the moment.</p>';
  }
}

loadBlogPosts();

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show when scrolled down
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

// Scroll smoothly to top
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});