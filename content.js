let currentHintIndex = 0;
let hints = [
  "Step 1: This problem likely requires O(n) time and O(1) space.",
  "Step 2: A brute force approach checks all pairs → O(n^2) time.",
  "Step 3: You can optimize using a hash map → O(n) time complexity.",
  "Step 4: If array is sorted, consider using two pointers or sliding window.",
  "Step 5: Build your solution by initializing a map and iterating once."
];

// Create the hint box with next button
function createHintBox() {
  const box = document.createElement("div");
  box.id = "leetcode-helper-hint-box";
  box.style.cssText = `
    position: fixed;
    bottom: 60px;
    right: 20px;
    background: rgba(0,0,0,0.9);
    color: white;
    padding: 14px 18px;
    border-radius: 10px;
    font-size: 14px;
    z-index: 9999;
    max-width: 320px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    white-space: pre-wrap;
    display: none;
    font-family: sans-serif;
  `;

  const hintText = document.createElement("div");
  hintText.id = "hint-text";
  hintText.innerText = hints[0];

  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Next Hint";
  nextBtn.style.cssText = `
    margin-top: 10px;
    padding: 6px 12px;
    background: #444;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `;

  nextBtn.onclick = () => {
    currentHintIndex++;
    if (currentHintIndex < hints.length) {
      hintText.innerText = hints[currentHintIndex];
    } else {
      hintText.innerText = "✅ All hints complete!";
      nextBtn.disabled = true;
    }
  };

  box.appendChild(hintText);
  box.appendChild(nextBtn);

  document.body.appendChild(box);
}

function toggleHintBox() {
  const box = document.getElementById("leetcode-helper-hint-box");
  if (!box) return;
  box.style.display = (box.style.display === "none") ? "block" : "none";
}

// Create box when page loads
createHintBox();

// Hotkey: Ctrl + Shift + H → toggle visibility
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === "H") {
    toggleHintBox();
  }
});
