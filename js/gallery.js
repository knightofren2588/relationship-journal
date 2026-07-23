/* ============================================================
   gallery.js — The photo wall

   Instead of hand-writing 63 <img> tags, we generate the list
   with loops. Adding future photos is easy: name them
   Memory55.jpeg, Memory56.jpeg, ... and raise the number below.
   ============================================================ */

const galleryPhotos = [];

// The original nine
for (let i = 1; i <= 9; i++) {
  galleryPhotos.push('images/Photo' + i + '.jpeg');
}

// The memories — raise this number as you add more photos
const LAST_MEMORY_NUMBER = 54;
for (let i = 1; i <= LAST_MEMORY_NUMBER; i++) {
  // padStart turns 1 into "01" so it matches the filenames
  galleryPhotos.push('images/Memory' + String(i).padStart(2, '0') + '.jpeg');
}

let lightboxIndex = 0;

function renderGallery() {
  const grid = document.getElementById('photoGrid');
  if (!grid) return;

  galleryPhotos.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Memory';
    img.className = 'photo-tile';
    // lazy = the browser only downloads photos as you scroll
    // near them, instead of all 63 at once
    img.loading = 'lazy';

    // If a file is missing, quietly remove its tile
    img.addEventListener('error', () => img.remove());

    // Click to view large
    img.addEventListener('click', () => openLightbox(index));

    grid.appendChild(img);
  });
}

/* ============================================================
   LIGHTBOX — the full-screen viewer.
   Click a photo to open. Click anywhere or press Escape to
   close. Arrow keys (or the on-screen arrows) move through
   the photos.
   ============================================================ */

function openLightbox(index) {
  lightboxIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  lightboxImg.src = galleryPhotos[lightboxIndex];
  lightbox.classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

function stepLightbox(step) {
  lightboxIndex = (lightboxIndex + step + galleryPhotos.length) % galleryPhotos.length;
  document.getElementById('lightboxImg').src = galleryPhotos[lightboxIndex];
}

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();

  // Build the lightbox once and keep it hidden until needed
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.innerHTML =
    '<button class="lightbox-arrow prev" aria-label="Previous">❮</button>' +
    '<img id="lightboxImg" alt="Memory, enlarged">' +
    '<button class="lightbox-arrow next" aria-label="Next">❯</button>';
  document.body.appendChild(lightbox);

  // Clicking the dark background closes it;
  // clicking the arrows moves through photos
  lightbox.addEventListener('click', (e) => {
    if (e.target.classList.contains('prev')) {
      e.stopPropagation();
      stepLightbox(-1);
    } else if (e.target.classList.contains('next')) {
      e.stopPropagation();
      stepLightbox(1);
    } else {
      closeLightbox();
    }
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  });
});
