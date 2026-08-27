const notes = document.getElementById("notes");

chrome.storage.local.get(["savedNote"], (result) => {
  if (result.savedNote) {
    notes.value = result.savedNote;
  }

  notes.focus();
});


notes.addEventListener("input", () => {
  chrome.storage.local.set({
    savedNote: notes.value
  });
});