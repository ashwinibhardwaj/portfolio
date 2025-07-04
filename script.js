AOS.init({ duration: 1000, once: false });

  document.addEventListener('DOMContentLoaded', function () {
    // profile pic
    const profilePic = document.getElementById('profilePic');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('closeModal');

  profilePic.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });

  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });

  // Close modal when clicking outside the image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });


    // === Academic Carousel ===
    let currentSlide = 0;
    const academicCarousel = document.getElementById('academic-carousel');
    const academicDots = document.querySelectorAll('.academic-dot');

    function showSlide(index) {
      currentSlide = index;
      const offset = index * academicCarousel.clientWidth;
      academicCarousel.style.transform = `translateX(-${offset}px)`;

      academicDots.forEach((dot, i) => {
        dot.classList.toggle('bg-teal-400', i === index);
        dot.classList.toggle('bg-gray-500', i !== index);
      });
    }

    setInterval(() => {
      currentSlide = (currentSlide + 1) % 2;
      showSlide(currentSlide);
    }, 4000);

    academicDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        showSlide(index);
      });
    });

    // === Certificates Carousel ===
    let currentCertSlide = 0;
    const certCarousel = document.getElementById('cert-carousel');
    const certDots = document.querySelectorAll('.cert-dot');

    function showCertSlide(index) {
      currentCertSlide = index;
      const offset = index * certCarousel.clientWidth;
      certCarousel.style.transform = `translateX(-${offset}px)`;

      certDots.forEach((dot, i) => {
        dot.classList.toggle('bg-teal-400', i === index);
        dot.classList.toggle('bg-gray-500', i !== index);
      });
    }

    setInterval(() => {
      currentCertSlide = (currentCertSlide + 1) % 4;
      showCertSlide(currentCertSlide);
    }, 5000);

    certDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        showCertSlide(index);
      });
    });

    // === Swipe Support ===
    function enableTouchSwipe(carouselId, showSlideCallback, slideCount, currentIndexVarName) {
      const carousel = document.getElementById(carouselId);
      let startX = 0;
      let endX = 0;

      carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      });

      carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            window[currentIndexVarName] = (window[currentIndexVarName] + 1) % slideCount;
          } else {
            window[currentIndexVarName] = (window[currentIndexVarName] - 1 + slideCount) % slideCount;
          }
          showSlideCallback(window[currentIndexVarName]);
        }
      });
    }

    enableTouchSwipe("academic-carousel", showSlide, 2, "currentSlide");
    enableTouchSwipe("cert-carousel", showCertSlide, 4, "currentCertSlide");



    // ✅ Enable swipe gestures here
    enableTouchSwipe("academic-carousel", showSlide, 2, "currentSlide");
    enableTouchSwipe("cert-carousel", showCertSlide, 3, "currentCertSlide");


  const tiltContainer = document.getElementById('lottie-tilt');
  const tiltInner     = document.getElementById('lottie-inner');

  tiltContainer.addEventListener('mousemove', e => {
    const { width, height, left, top } = tiltContainer.getBoundingClientRect();
    const x = e.clientX - left  - width  / 2;
    const y = e.clientY - top   - height / 2;
    const rotateX = (-y / height) * 20;  // tilt sensitivity
    const rotateY = ( x / width ) * 20;
    tiltInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tiltContainer.addEventListener('mouseleave', () => {
    tiltInner.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });


  // Random code snippets
  const snippets = [
  "import pandas as pd \nimport numpy as np\nimport matplotlib.pyplot as plt\nimport seaborn as sns",
  "from sklearn.model_selection import train_test_split",
  "from sklearn.linear_model import LogisticRegression",
  "from sklearn.metrics import accuracy_score",
  "df = pd.read_csv('data.csv')",
  "df.head()\ndf.describe()"
];


  const contentEl = document.getElementById('code-content');
  let snippetIndex = 0, charIndex = 0;

  function typeSnippet() {
    const text = snippets[snippetIndex];
    if (charIndex <= text.length) {
      contentEl.textContent = text.slice(0, charIndex);
      charIndex++;
      setTimeout(typeSnippet, 50 + Math.random()*100);
    } else {
      // pause, then clear and next snippet
      setTimeout(() => {
        contentEl.textContent = '';
        charIndex = 0;
        snippetIndex = (snippetIndex + 1) % snippets.length;
        setTimeout(typeSnippet, 300);
      }, 1000 + Math.random()*500);
    }
  }

  // kick off
  typeSnippet();



// Email logic
  document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const submitBtn = document.getElementById('submit-btn');
    const buttonText = document.getElementById('button-text');
    const buttonLoader = document.getElementById('button-loader');
    const formStatus = document.getElementById('form-status');

    // Show Loader
    buttonText.textContent = 'Sending...';
    buttonLoader.classList.remove('hidden');
    submitBtn.disabled = true;

    // Replace this with your Formspree endpoint
    const formspreeEndpoint = 'https://formspree.io/f/mnnvgynq';

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (response.ok) {
        formStatus.classList.remove('hidden');
        form.reset();

        // Hide message after 3 seconds
        setTimeout(() => {
          formStatus.classList.add('hidden');
        }, 3000);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error('Form submission error:', error);
    }

    // Hide Loader
    buttonText.textContent = 'Send Message ✉️';
    buttonLoader.classList.add('hidden');
    submitBtn.disabled = false;
  });

  // google analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-KMBFQ2GHRM');
});
