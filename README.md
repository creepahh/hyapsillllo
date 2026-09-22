# Hyapsilo Notes

A tiny floating notes widget for Chrome. Press a shortcut, jot something down, and get back to what you were doing — the note autosaves and follows you everywhere.

## Features

- **Quick toggle** — `Ctrl+Shift+H` (`Cmd+Shift+H` on macOS) opens or closes the notes panel on any page
- **Toolbar popup** — click the extension icon in the toolbar for the same notes
- **Autosaves** — every keystroke is saved to `chrome.storage.local`; closing the tab loses nothing
- **Syncs across tabs** — open the notes in multiple tabs and edits stay consistent
- **Scrollable panel** — long notes scroll inside the widget instead of growing off-screen
- **Private & lightweight** — plain JavaScript, zero dependencies, no tracking. `storage` is the only required permission

## Install

### From the release zip

1. Download the zip from the [latest release](https://github.com/creepahh/hyapsillllo/releases/latest)
2. Unzip it somewhere permanent
3. Open `chrome://extensions` in Chrome
4. Turn on **Developer mode** (toggle in the top-right corner)
5. Click **Load unpacked** and select the unzipped folder

### From source

1. Clone this repo
2. Open `chrome://extensions`, enable **Developer mode**
3. Click **Load unpacked** and select this repo's folder (the one containing `manifest.json`)

## Usage

| Action | How |
| --- | --- |
| Open / close the floating notes | `Ctrl+Shift+H` (macOS: `Cmd+Shift+H`) |
| Open the toolbar popup | Click the Hyapsilo Notes icon in the Chrome toolbar |

Type to edit — it saves as you go. Closing the widget or the popup keeps your text.

**Note:** the extension can't inject into Chrome-internal pages such as `chrome://` pages or the Chrome Web Store.

## Build

Zero dependencies, so there's no install step. Optionally create a distribution folder and zip:

```sh
npm run build
```

This produces `dist/hyapsilo-notes/` (load this in **Load unpacked**) and a shareable `dist/hyapsilo-notes.zip`.