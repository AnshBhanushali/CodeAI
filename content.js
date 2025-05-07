let currentHintIndex = 0;
let hints = [
  "📝 Step 1: Time complexity: O(n), space: O(1).",
  "💭 Step 2: Brute force approach checks all pairs → O(n^2).",
  "🚀 Step 3: Optimize with hash map for O(n).",
  "🔍 Step 4: Try sliding window for substring problems.",
  "✅ Step 5: Code with hash set to track seen characters."
];

function createHintBox() {
  const box = document.createElement("div");
  box.id = "leetcode-helper-hint-box";
  box.style.cssText = `
    position: fixed;
    top: 100px;
    left: 100px;
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 12px 18px;
    border-radius: 10px;
    font-size: 14px;
    z-index: 9999;
    max-width: 320px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    white-space: pre-wrap;
    cursor: move;
    user-select: none;
  `;

  const header = document.createElement("div");
  header.innerText = "💡 LeetCode Helper";
  header.style.cssText = `
    font-weight: bold;
    margin-bottom: 8px;
    cursor: move;
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

  box.appendChild(header);
  box.appendChild(hintText);
  box.appendChild(nextBtn);
  document.body.appendChild(box);

  // DRAGGABLE LOGIC
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - box.getBoundingClientRect().left;
    offsetY = e.clientY - box.getBoundingClientRect().top;
    box.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      box.style.left = `${e.clientX - offsetX}px`;
      box.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    box.style.cursor = 'move';
  });
}

function toggleHintBox() {
  const box = document.getElementById("leetcode-helper-hint-box");
  if (!box) return;
  box.style.display = (box.style.display === "none") ? "block" : "none";
}

createHintBox();

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === "H") {
    toggleHintBox();
  }
});
