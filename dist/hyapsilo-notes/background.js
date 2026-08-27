chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "open-notes") return;

  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  const tab = tabs[0];

  if (!tab?.id) return;

  chrome.tabs.sendMessage(tab.id, {
    type: "TOGGLE_NOTES"
  }).catch(() => {
    // Ignore pages where Chrome doesn't allow extensions.
  });
});
