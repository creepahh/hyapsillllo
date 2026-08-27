Hyapsilo Notes
A tiny Chrome extension for quick notes while browsing.

Features
Press Ctrl + Shift + H to open/close notes.
Notes appear as a small floating modal over the current webpage.
Soft baby-pink interface.
Uses hyapsiloimg.png as the avatar.
Notes automatically save while typing.
Notes persist after closing the modal.
Reopen the notes and your previous text is still there.
Long notes scroll inside the writing area.
Avatar can briefly hover out from the side while typing.
Files
Hyapsilo Notes/
├── manifest.json
├── background.js
├── content.js
└── hyapsiloimg.png

Setup
Open Chrome.
Go to chrome://extensions.
Enable Developer mode.
Click Load unpacked.
Select the Hyapsilo Notes folder.
Visit a normal webpage.
Press Ctrl + Shift + H.
Note
The extension cannot inject itself into certain Chrome-internal pages such as chrome:// pages or the Chrome Web Store.

The current version uses chrome.storage.local, so your note remains saved until you erase or replace it.
