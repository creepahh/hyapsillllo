let notesContainer = null;
let notesTextarea = null;
let floatingAvatar = null;
let isOpen = false;
let avatarTimer = null;

const STORAGE_KEY = "hyapsiloSavedNote";

function createNotes() {
  if (notesContainer) return;

  // Main notes window
  notesContainer = document.createElement("div");

  notesContainer.style.cssText = `
    position: fixed;
    top: 64px;
    right: 24px;

    width: min(420px, calc(100vw - 48px));
    height: min(560px, calc(100vh - 88px));
    min-height: 320px;

    box-sizing: border-box;

    z-index: 2147483647;

    display: flex;
    flex-direction: column;

    background: #ffdce8;

    border-radius: 18px;

    box-shadow:
      0 12px 40px rgba(80, 30, 50, 0.22),
      0 2px 8px rgba(80, 30, 50, 0.12);

    overflow: visible;

    font-family:
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
  `;

  // Header
  const header = document.createElement("div");

  header.style.cssText = `
    height: 64px;

    padding: 10px 14px 10px 16px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    flex-shrink: 0;
  `;

  // Header left side
  const headerLeft = document.createElement("div");

  headerLeft.style.cssText = `
    display: flex;
    align-items: center;
    gap: 10px;
  `;

  // Header avatar
  const headerAvatar = document.createElement("img");

  headerAvatar.src = chrome.runtime.getURL("hyapsiloimg.png");

  headerAvatar.alt = "Hyapsilo";

  headerAvatar.style.cssText = `
    width: 38px;
    height: 38px;

    border-radius: 50%;

    object-fit: cover;

    flex-shrink: 0;
  `;

  // Title
  const title = document.createElement("div");

  title.textContent = "My notes";

  title.style.cssText = `
    font-size: 14px;
    font-weight: 600;

    color: #593c48;
  `;

  headerLeft.appendChild(headerAvatar);
  headerLeft.appendChild(title);

  // Close button
  const closeButton = document.createElement("button");

  closeButton.textContent = "×";

  closeButton.setAttribute("aria-label", "Close notes");

  closeButton.style.cssText = `
    width: 32px;
    height: 32px;

    padding: 0;

    border: none;
    border-radius: 50%;

    background: rgba(255, 255, 255, 0.45);

    color: #795765;

    font-size: 23px;
    line-height: 1;

    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
  `;

  closeButton.addEventListener("mouseenter", () => {
    closeButton.style.background =
      "rgba(255, 255, 255, 0.7)";
  });

  closeButton.addEventListener("mouseleave", () => {
    closeButton.style.background =
      "rgba(255, 255, 255, 0.45)";
  });

  closeButton.addEventListener("click", closeNotes);

  header.appendChild(headerLeft);
  header.appendChild(closeButton);

  // Notes textarea
  notesTextarea = document.createElement("textarea");

  notesTextarea.placeholder = "Write something...";

  notesTextarea.spellcheck = true;

  notesTextarea.style.cssText = `
    flex: 1;

    width: 100%;
    min-height: 0;
    box-sizing: border-box;

    padding: 16px 17px;

    border: none;
    outline: none;
    resize: none;

    background: #ffeaf1;

    color: #46343b;

    font-family:
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;

    font-size: 15px;

    line-height: 1.6;

    overflow-y: auto;

    border-radius: 0 0 18px 18px;
  `;

  // Save whenever typing happens
  notesTextarea.addEventListener("input", () => {
    saveNote();
    showFloatingAvatar();
  });

  // Put everything together
  notesContainer.appendChild(header);
  notesContainer.appendChild(notesTextarea);

  document.documentElement.appendChild(notesContainer);

  // Create the floating avatar
  createFloatingAvatar();

  // Load previous note
  chrome.storage.local.get([STORAGE_KEY], (result) => {
    if (result[STORAGE_KEY]) {
      notesTextarea.value = result[STORAGE_KEY];
    }
  });
}


// Floating avatar
function createFloatingAvatar() {
  floatingAvatar = document.createElement("img");

  floatingAvatar.src =
    chrome.runtime.getURL("hyapsiloimg.png");

  floatingAvatar.alt = "Hyapsilo";

  floatingAvatar.style.cssText = `
    position: absolute;

    width: 58px;
    height: 58px;

    right: -46px;
    top: 115px;

    border-radius: 50%;

    object-fit: cover;

    cursor: pointer;

    z-index: 10;

    transform: translateX(70px);

    opacity: 0;

    transition:
      transform 0.55s cubic-bezier(.22, 1, .36, 1),
      opacity 0.35s ease;

    filter:
      drop-shadow(0 5px 10px rgba(80, 30, 50, 0.2));
  `;

  // Click reaction
  floatingAvatar.addEventListener("click", () => {
    floatingAvatar.style.transform =
      "translateX(0) scale(1.12) rotate(-5deg)";

    setTimeout(() => {
      if (floatingAvatar) {
        floatingAvatar.style.transform =
          "translateX(0) scale(1) rotate(0deg)";
      }
    }, 220);
  });

  notesContainer.appendChild(floatingAvatar);
}


// Show avatar when typing
function showFloatingAvatar() {
  if (!floatingAvatar) return;

  // Cancel previous hide timer
  clearTimeout(avatarTimer);

  // Slide avatar in
  floatingAvatar.style.opacity = "1";

  floatingAvatar.style.transform =
    "translateX(0)";

  // Keep it around for 3 seconds
  avatarTimer = setTimeout(() => {
    hideFloatingAvatar();
  }, 3000);
}


// Hide avatar
function hideFloatingAvatar() {
  if (!floatingAvatar) return;

  floatingAvatar.style.opacity = "0";

  floatingAvatar.style.transform =
    "translateX(70px)";
}


// Open notes
function openNotes() {
  createNotes();

  notesContainer.style.display = "flex";

  isOpen = true;

  setTimeout(() => {
    notesTextarea.focus();

    // Put cursor at end
    notesTextarea.selectionStart =
      notesTextarea.value.length;

    notesTextarea.selectionEnd =
      notesTextarea.value.length;
  }, 50);
}


// Close notes
function closeNotes() {
  if (!notesContainer) return;

  notesContainer.style.display = "none";

  isOpen = false;

  hideFloatingAvatar();
}


// Toggle notes
function toggleNotes() {
  if (!notesContainer || !isOpen) {
    openNotes();
  } else {
    closeNotes();
  }
}


// Save note
function saveNote() {
  chrome.storage.local.set({
    [STORAGE_KEY]: notesTextarea.value
  });
}


// Listen for keyboard shortcut
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "TOGGLE_NOTES") {
    toggleNotes();
  }
});
