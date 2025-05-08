let currentHintIndex = 0;

// ✅ Grab title from DOM if possible
let problemTitle = document.querySelector('div[data-cy="question-title"]')?.innerText;

// ✅ If not found → extract from URL slug:
if (!problemTitle) {
  const urlParts = window.location.pathname.split('/');
  const slug = urlParts.includes('problems') ? urlParts[urlParts.indexOf('problems') + 1] : 'unknown-problem';
  problemTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ✅ Try multiple selectors for description
const descriptionContainer =
  document.querySelector('.content__u3I1.question-content__JfgR') ||
  document.querySelector('.content__u3I1') ||
  document.querySelector('.question-content__JfgR') ||
  document.querySelector('.description__24sA') ||
  document.querySelector('[data-cy="description-content"]');

const descriptionParagraphs = descriptionContainer?.querySelectorAll('p');
const problemDescription = descriptionParagraphs
  ? Array.from(descriptionParagraphs).map(p => p.innerText).join('\n')
  : (descriptionContainer?.innerText.trim() ?? "");

// ✅ Combine context:
const problemContext = `Problem Title: ${problemTitle}\nProblem Description: ${problemDescription}\nURL: ${window.location.href}\n`;

// ✅ Create prompt list:
const prompts = [
  `${problemContext} Act as senior level software developer, interviewing at Google. Now, explain this LeetCode problem in simple terms, its requirements and also explain what is the time and space complexity and why`,
  `${problemContext} Explain the brute force approach for this problem and aslo the detailed approach to solve using brute force while telling its time and space complexity and then explain its limitations.`,
  `${problemContext} Explain which pattern would best suite here for example leetcode has patterns like sliding window, or prefix sum or two sum, tell which pattern would be most optimal.`,
  `${problemContext} Explain the optimized and best approach for this problem and give the step by step explanation on how to solve it with time and space compexities.`,
  `${problemContext} Explain coding plan step-by-step for implementation we will be using python strictly.`
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
    try {
      const response = await fetch(`https://1eea-2603-6010-5300-4021-f52e-1854-2875-e5a1.ngrok-free.app/api/generate-hint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompts[currentHintIndex] })
      });
      const data = await response.json();
      hintText.innerText = data.hint ?? "No hint generated.";
    } catch (err) {
      console.error(err);
      hintText.innerText = "❌ Error loading hint.";
    }
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
