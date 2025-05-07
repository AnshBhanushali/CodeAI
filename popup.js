document.getElementById("showHintBtn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const box = document.getElementById("leetcode-helper-hint-box");
        if (box) box.style.display = "block";
      }
    });
  });
  