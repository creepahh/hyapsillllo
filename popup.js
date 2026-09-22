const notes = document.getElementById("notes");

chrome.storage.local.get(["hyapsiloSavedNote"], (result) => {
  if (result.hyapsiloSavedNote) {
    notes.value = result.hyapsiloSavedNote;
  }

  notes.focus();
});


notes.addEventListener("input", () => {
  chrome.storage.local.set({
    hyapsiloSavedNote: notes.value
  });
});