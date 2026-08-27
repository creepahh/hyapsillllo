chrome.commands.onCommand.addListener((command) => {
  if (command === "open-notes") {
    chrome.windows.create({
      url: chrome.runtime.getURL("popup.html"),
      type: "popup",
      width: 420,
      height: 460
    });
  }
});
