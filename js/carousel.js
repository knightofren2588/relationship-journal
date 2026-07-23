/* ============================================================
   carousel.js — Photo carousel

   Fixes over the old version:
   1. The prev/next buttons are wired up HERE now (before, only
      debug.html connected them, so they didn't work on the
      real page).
   2. Clicking prev/next restarts the 5-second autoplay timer,
      so the slideshow doesn't jump right after a manual click.
   ============================================================ */

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-image');
let autoPlayInterval;

// Show only the slide at the given position
function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('show'));
  if (slides[index]) {
    slides[index].classList.add('show');
  }
}

// Move forward (+1) or back (-1), wrapping around the ends
function changeSlide(step) {
  currentSlide = (currentSlide + step + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Auto-advance every 5 seconds
function startAutoPlay() {
  clearInterval(autoPlayInterval); // never stack two timers
  autoPlayInterval = setInterval(() => changeSlide(1), 5000);
}

// A manual action = change slide AND restart the timer
function manualChange(step) {
  changeSlide(step);
  startAutoPlay();
}

// Swipe support for phones
function enableSwipe() {
  let startX = 0;
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      manualChange(diff > 0 ? -1 : 1);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  showSlide(currentSlide);
  startAutoPlay();
  enableSwipe();

  // Wire up the arrow buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.addEventListener('click', () => manualChange(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => manualChange(1));
});
