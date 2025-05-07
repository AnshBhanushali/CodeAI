let currentHintIndex = 0;
let lastCodeSent = "";
let feedbackDisplayed = false;

const problemTitleSelector = document.querySelector('.css-v3d350');
const problemTitle = problemTitleSelector ? problemTitleSelector.innerText : "Unknown LeetCode Problem";

const prompts = [
  `Explain the LeetCode problem "${problemTitle}" in simple terms including what it asks, input/output, and constraints.`,
  `Explain the time and space complexity constraints for "${problemTitle}" and why they are set this way.`,
  `Explain the brute force approach for "${problemTitle}" with pros and cons.`,
  `Explain the optimal approach for "${problemTitle}" including which pattern (e.g., sliding window, DP) applies and why.`,
  `Generate a coding plan to solve "${problemTitle}" step-by-step.`
];

function createHintBox() {
  const box = document.createElement("div");
  box.id = "leetcode-helper-hint-box";
  box.style.cssText = `
    position: fixed;
    top: 100px;
    left: 100px;
    background: rgba(0,0,0,0.9);
    color: white;
    padding: 12px 18px;
    border-radius: 10px;
    font-size: 14px;
    z-index: 9999;
    max-width: 340px;
    cursor: grab;
    user-select: none;
  `;

  const header = document.createElement("div");
  header.innerText = "💡 CodeAI Helper";
  header.style.cssText = `font-weight: bold; margin-bottom: 8px;`;

  const hintText = document.createElement("div");
  hintText.id = "hint-text";
  hintText.innerText = "Click Next to load explanation.";

  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Next Explanation";
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
      hintText.innerText = "✅ All explanations complete. Writing code monitoring started!";
      nextBtn.disabled = true;
      startCodeMonitoring();
      return;
    }
    hintText.innerText = "⏳ Loading explanation...";
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

function getCurrentEditorCode() {
  const codeArea = document.querySelector('textarea'); // fallback
  const codeMirror = document.querySelector('.view-lines');
  if (codeMirror) {
    const lines = [...codeMirror.querySelectorAll('.view-line')].map(line => line.innerText);
    return lines.join('\n');
  } else if (codeArea) {
    return codeArea.value;
  }
  return '';
}

function startCodeMonitoring() {
  setInterval(async () => {
    const code = getCurrentEditorCode();
    if (code && code !== lastCodeSent) {
      lastCodeSent = code;
      const feedback = await fetch(`http://localhost:3000/api/review-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, problemTitle })
      }).then(res => res.json()).then(data => data.feedback);
      document.getElementById('hint-text').innerText = `📝 Feedback:\n${feedback}`;
    }
  }, 5000); 
}

createHintBox();
