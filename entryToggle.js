function toggleEntry(header) {
    const body = header.nextElementSibling;
    if (body) {
        body.classList.toggle('open');
    }
}

// Make function globally accessible
window.toggleEntry = toggleEntry;