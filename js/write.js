/* ============================================================
   write.js — the in-site writing desk (secret word edition)

   - The word decides the voice: his 🖤 or hers 🤍 (WRITER_WORDS
     in supabase-init.js). Typed once per device, then remembered.
   - Photos attach by uploading to the Supabase "journal-photos"
     storage bucket; their links are saved with the entry.
   - Editing: opened from an entry's ✎ Edit button; the desk
     fills with that entry and "Post" becomes "Save changes".
   ============================================================ */

const WORD_STORAGE_KEY = 'journal-word';

let editingId = null;       // null = writing new; an id = editing that entry
let editingPhotos = [];     // photos already on the entry being edited

function todayString() {
  return new Date().toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });
}

// Which voice does the remembered word belong to? (null = none)
function currentVoice() {
  const word = (localStorage.getItem(WORD_STORAGE_KEY) || '').toLowerCase().trim();
  return window.WRITER_WORDS[word] || null;
}

/* ---------- View switching ---------- */

function refreshWriteView() {
  const unconfigured = document.getElementById('writeUnconfigured');
  const wordBox = document.getElementById('writeWord');
  const editorBox = document.getElementById('writeEditor');
  if (!unconfigured || !wordBox || !editorBox) return;

  if (!window.journalDB) {
    unconfigured.style.display = 'block';
    wordBox.style.display = 'none';
    editorBox.style.display = 'none';
    return;
  }
  unconfigured.style.display = 'none';

  const voice = currentVoice();

  if (voice) {
    wordBox.style.display = 'none';
    editorBox.style.display = 'block';

    document.getElementById('writeWhoami').textContent =
      voice === 'alysha' ? 'Writing in her voice 🤍' : 'Writing in your voice 🖤';

    const dateField = document.getElementById('liveDate');
    if (!dateField.value) dateField.value = todayString();
  } else {
    wordBox.style.display = 'block';
    editorBox.style.display = 'none';
  }
}

/* ---------- Editing ---------- */

// Called by the ✎ Edit button in the Journal (entries.js)
function startEditingEntry(entry) {
  editingId = entry.id;
  editingPhotos = entry.photos ? entry.photos.slice() : [];

  document.getElementById('liveDate').value = entry.date;
  document.getElementById('liveText').value = entry.paragraphs.join('\n\n');
  document.getElementById('postBtn').textContent = 'Save changes 🖤';
  document.getElementById('cancelEditBtn').style.display = 'inline-block';
  document.getElementById('postStatus').textContent =
    'Editing the entry from ' + entry.date +
    (editingPhotos.length ? ' — its ' + editingPhotos.length + ' photo(s) stay attached; adding files adds more.' : '');

  refreshWriteView();
  window.scrollTo(0, 0);
}
window.startEditingEntry = startEditingEntry;

function stopEditing() {
  editingId = null;
  editingPhotos = [];
  document.getElementById('liveDate').value = todayString();
  document.getElementById('liveText').value = '';
  document.getElementById('livePhotos').value = '';
  document.getElementById('postBtn').textContent = 'Post to the journal 🖤';
  document.getElementById('cancelEditBtn').style.display = 'none';
  document.getElementById('postStatus').textContent = '';
}

/* ---------- Photo upload ---------- */

async function uploadPhotos(fileList) {
  const urls = [];
  for (const file of fileList) {
    // A safe, unique filename for the bucket
    const clean = file.name.replace(/[^a-zA-Z0-9.]+/g, '-');
    const path = Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '-' + clean;

    const { error } = await window.journalDB
      .storage.from('journal-photos').upload(path, file);

    if (!error) {
      const { data } = window.journalDB
        .storage.from('journal-photos').getPublicUrl(path);
      if (data && data.publicUrl) urls.push(data.publicUrl);
    }
  }
  return urls;
}

/* ---------- Wiring ---------- */

function setupWriteDesk() {
  const wordBtn = document.getElementById('wordBtn');
  const postBtn = document.getElementById('postBtn');
  const forgetBtn = document.getElementById('forgetWordBtn');
  const cancelBtn = document.getElementById('cancelEditBtn');
  if (!wordBtn) return;

  // --- Give the word ---
  wordBtn.addEventListener('click', () => {
    const status = document.getElementById('wordStatus');
    const attempt = document.getElementById('wordInput').value.toLowerCase().trim();

    if (window.WRITER_WORDS[attempt]) {
      localStorage.setItem(WORD_STORAGE_KEY, attempt);
      document.getElementById('wordInput').value = '';
      status.textContent = '';
      refreshWriteView();
    } else {
      status.textContent = "That's not the word. 🖤";
    }
  });

  document.getElementById('wordInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') wordBtn.click();
  });

  // --- Post (or save an edit) ---
  postBtn.addEventListener('click', async () => {
    const status = document.getElementById('postStatus');
    const text = document.getElementById('liveText').value.trim();
    const date = document.getElementById('liveDate').value.trim() || todayString();
    const voice = currentVoice();

    if (!voice) { refreshWriteView(); return; }
    if (!text) {
      status.textContent = 'Write something first 🖤';
      return;
    }

    // Upload any chosen photos first
    const fileInput = document.getElementById('livePhotos');
    let photos = editingPhotos.slice();
    if (fileInput.files.length > 0) {
      status.textContent = 'Uploading photo' + (fileInput.files.length > 1 ? 's' : '') + '…';
      const newUrls = await uploadPhotos(fileInput.files);
      photos = photos.concat(newUrls);
    }

    status.textContent = editingId ? 'Saving…' : 'Posting…';

    let error;
    if (editingId) {
      ({ error } = await window.journalDB
        .from('live_entries')
        .update({ entry_date: date, content: text, photos: photos })
        .eq('id', editingId));
    } else {
      ({ error } = await window.journalDB
        .from('live_entries')
        .insert({ entry_date: date, author: voice, content: text, photos: photos }));
    }

    if (error) {
      status.textContent = "It didn't save — check your connection and try again.";
      return;
    }

    const wasEditing = editingId !== null;
    stopEditing();
    status.textContent = wasEditing
      ? 'Saved. The entry is updated. 🖤'
      : 'Posted. It lives in the journal now. 🖤';

    if (typeof loadLiveEntries === 'function') {
      loadLiveEntries();
    }
  });

  // --- Cancel an edit ---
  cancelBtn.addEventListener('click', stopEditing);

  // --- Put the pen down (forget the word on this device) ---
  forgetBtn.addEventListener('click', () => {
    localStorage.removeItem(WORD_STORAGE_KEY);
    stopEditing();
    refreshWriteView();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  refreshWriteView();
  setupWriteDesk();
});
