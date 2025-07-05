let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-image');
let autoPlayInterval;

// Show current slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('show');
  });
  slides[index].classList.add('show');
}

// Go to next or previous
function changeSlide(step) {
  currentSlide = (currentSlide + step + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Auto-play every 5 seconds
function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    changeSlide(1);
  }, 5000);
}

// Swipe support
function enableSwipe() {
  let startX = 0;

  document.querySelector('.carousel').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  document.querySelector('.carousel').addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = endX - startX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        changeSlide(-1); // Swipe right
      } else {
        changeSlide(1); // Swipe left
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  showSlide(currentSlide);
  startAutoPlay();
  enableSwipe();
});