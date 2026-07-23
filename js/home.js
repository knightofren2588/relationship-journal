/* ============================================================
   home.js — Words for her, the candle, and her song

   EDIT THE WORDS BELOW — these are placeholders. Make them the
   things you actually say to her. Short lines land the hardest.
   ============================================================ */

const wordsForHer = [
  "I still talk to you every day.",
  "You are my favorite everything.",
  "Thank you for loving all of me.",
  "Every firefly on this page is for you.",
  "Until I see you again.",
  "Love never dies."
];

/* ============================================================
   Rotating words — one phrase fades in, rests, fades out.
   ============================================================ */

let wordIndex = 0;

function rotateWords() {
  const el = document.getElementById('wordsForHer');
  if (!el || wordsForHer.length === 0) return;

  // fade out, swap the text, fade back in
  el.style.opacity = '0';
  setTimeout(() => {
    el.textContent = wordsForHer[wordIndex];
    el.style.opacity = '1';
    wordIndex = (wordIndex + 1) % wordsForHer.length;
  }, 800);
}

/* ============================================================
   The candle — click (or press Enter) to light it.
   The flame itself is pure CSS; this just flips a class.
   ============================================================ */

function setupCandle() {
  const candle = document.getElementById('candle');
  const caption = document.getElementById('candleCaption');
  if (!candle) return;

  function toggleCandle() {
    const lit = candle.classList.toggle('lit');
    if (caption) {
      caption.textContent = lit
        ? 'A candle burns for Alysha 🤍'
        : 'Light a candle for her 🕯️';
    }
  }

  candle.addEventListener('click', toggleCandle);
  candle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCandle();
    }
  });
}

/* ============================================================
   Her song — strictly opt-in. The button only appears if the
   audio file exists, and nothing ever autoplays.
   ============================================================ */

function setupSong() {
  const player = document.getElementById('songPlayer');
  const button = document.getElementById('songToggle');
  const audio = document.getElementById('herSong');
  if (!player || !button || !audio) return;

  const source = audio.querySelector('source');

  // Hidden until we know the file is really there
  player.style.display = 'none';
  audio.addEventListener('loadedmetadata', () => {
    player.style.display = 'block';
  });
  if (source) {
    source.addEventListener('error', () => {
      player.style.display = 'none';
    });
  }
  audio.load();

  button.addEventListener('click', () => {
    if (audio.paused) {
      audio.volume = 0.6;
      audio.play();
      button.textContent = '❚❚ Pause her song';
    } else {
      audio.pause();
      button.textContent = '▶ Play her song';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  rotateWords();                     // show the first phrase right away
  setInterval(rotateWords, 7000);    // then a new one every 7 seconds
  setupCandle();
  setupSong();
});
