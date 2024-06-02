function saveNotes() {
    const notes = document.getElementById('notesArea').value;
    localStorage.setItem('userNotes', notes);
}
// Load saved notes on page load

document.addEventListener('DOMContentLoaded', function() {
    const savedNotes = localStorage.getItem('userNotes');
    if (savedNotes) {
        document.getElementById('notesArea').value = savedNotes;
    }
});
