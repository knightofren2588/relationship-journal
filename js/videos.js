/* ============================================================
   videos.js — Video Messages to her

   HOW TO ADD A NEW VIDEO MESSAGE:
   1. Record your video, then convert it for the web in the
      terminal (from the relationship-journal folder):

      ffmpeg -i "path/to/your/recording.mov" -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart "videos/message2.mp4"

      (-pix_fmt yuv420p is the setting that keeps it playable
       in every browser — we learned that one the hard way.)

   2. Copy the template below and paste it right after
      "const videoMessages = [" so newest appear first.

   TEMPLATE:
   {
     date: "July 23, 2026",
     title: "A message for you",
     file: "videos/message2.mp4",
     words: "A few sentences about this message, shown under the video."
   },
   ============================================================ */

const videoMessages = [

  // Your first video message goes here.

];

/* ============================================================
   RENDERER — you shouldn't need to touch anything below.
   ============================================================ */

function renderVideoMessages() {
  const container = document.getElementById('videoMessages');
  if (!container) return;

  // A gentle note while the section is still empty
  if (videoMessages.length === 0) {
    const note = document.createElement('p');
    note.className = 'video-empty-note';
    note.textContent = 'The first message is on its way. 🖤';
    container.appendChild(note);
    return;
  }

  videoMessages.forEach(msg => {
    const card = document.createElement('article');
    card.className = 'video-card';

    const heading = document.createElement('h3');
    heading.textContent = '🖤 ' + msg.title;

    const dateLine = document.createElement('div');
    dateLine.className = 'video-date';
    dateLine.textContent = msg.date;

    const video = document.createElement('video');
    video.controls = true;
    video.preload = 'metadata';
    video.playsInline = true;

    const source = document.createElement('source');
    source.src = msg.file;
    source.type = 'video/mp4';
    video.appendChild(source);

    // If the file is missing, hide the whole card rather than
    // showing a broken player
    source.addEventListener('error', () => card.remove());

    card.appendChild(heading);
    card.appendChild(dateLine);
    card.appendChild(video);

    if (msg.words) {
      const words = document.createElement('p');
      words.className = 'video-words';
      words.textContent = msg.words;
      card.appendChild(words);
    }

    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderVideoMessages);
