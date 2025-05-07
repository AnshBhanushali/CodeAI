let currentHintIndex = 0;
const prompts = [
  "Explain time and space constraints for this problem.",
  "Explain brute force approach for this problem.",
  "Explain optimized approach for this problem.",
  "Explain sliding window applicability.",
  "Explain coding plan step by step."
];

function createHintBox() {
  const box = document.createElement("div");
  box.id = "leetcode-helper-hint-box";
  box.style.cssText = `
    position: fixed;
    top: 100px;
    left: 100px;
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 12px 18px;
    border-radius: 10px;
    font-size: 14px;
    z-index: 9999;
    max-width: 320px;
    cursor: grab;
    user-select: none;
  `;

  const header = document.createElement("div");
  header.innerText = "💡 CodeAI Helper";
  header.style.cssText = `font-weight: bold; margin-bottom: 8px;`;

  const hintText = document.createElement("div");
  hintText.id = "hint-text";
  hintText.innerText = "Click Next to load hint.";

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

  nextBtn.onclick = async () => {
    if (currentHintIndex >= prompts.length) {
      hintText.innerText = "✅ All hints completed.";
      nextBtn.disabled = true;
      return;
    }
    hintText.innerText = "⏳ Loading...";
    const hint = await fetch(`http://localhost:3000/api/generate-hint`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompts[currentHintIndex] })
    }).then(res => res.json()).then(data => data.hint);
    hintText.innerText = hint;
    currentHintIndex++;
  };

  box.appendChild(header);
  box.appendChild(hintText);
  box.appendChild(nextBtn);
  document.body.appendChild(box);

  // Drag logic
  let offsetX = 0, offsetY = 0, isDragging = false;
  box.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - box.getBoundingClientRect().left;
    offsetY = e.clientY - box.getBoundingClientRect().top;
    box.style.cursor = 'grabbing';
    e.preventDefault();
  });
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      box.style.left = `${e.clientX - offsetX}px`;
      box.style.top = `${e.clientY - offsetY}px`;
    }
  });
  document.addEventListener('mouseup', () => {
    isDragging = false;
    box.style.cursor = 'grab';
  });
}

createHintBox();
