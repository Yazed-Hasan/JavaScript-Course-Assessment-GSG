document.addEventListener('DOMContentLoaded', function() {
  const renameButton = document.getElementById('renameButton');
  const newTitleInput = document.getElementById('newTitle');

  renameButton.addEventListener('click', function() {
    const newTitle = newTitleInput.value;
    if (newTitle) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          func: (title) => {
            document.title = title;
          },
          args: [newTitle]
        });
      });
    }
  });
});
