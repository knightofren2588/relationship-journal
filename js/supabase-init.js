/* ============================================================
   supabase-init.js — connects the site to your Supabase project

   TO FINISH CONNECTING:
   1. In Supabase: Settings → API → copy the "anon public" key
      into SUPABASE_ANON_KEY below.
      (The anon key is DESIGNED to be public — it's safe here.
       NEVER put the "service_role" key in this file.)
   2. Choose the two secret words below — yours and hers.
      The word someone types on the Write page decides whose
      voice the entry is written in.
   ============================================================ */

const SUPABASE_URL = 'https://vgrtovcykcqtlvvndzej.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZncnRvdmN5a2NxdGx2dm5kemVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MzYyODYsImV4cCI6MjEwMDQxMjI4Nn0.tTyJZ-Bkc4ZE4Jra6JuGKWtfZdfytEnyQTHuymgVX6U';

// The secret words — case doesn't matter when typing them.
const WRITER_WORDS = {
  'queen extra': 'mike',        // your word — posts in your voice 🖤
  'constellation': 'alysha'     // her word — posts in her voice 🤍
};

/* ------------------------------------------------------------
   Setup — nothing below needs editing.
   If the keys above are still placeholders, the site simply
   runs without the live journal, exactly as before.
   ------------------------------------------------------------ */

window.journalDB = null;
window.WRITER_WORDS = WRITER_WORDS;

if (!SUPABASE_URL.startsWith('PASTE') && window.supabase) {
  window.journalDB = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
