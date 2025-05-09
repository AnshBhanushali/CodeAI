CodeAI 💡 — AI-powered Problem Solving Coding Assistant
Welcome to CodeAI, an AI-driven coding assistant that integrates directly into LeetCode to provide step-by-step explanations, hints, and coding plans for any problem — all while you're solving it!

✨ Features
✅ Detects the current LeetCode problem title and description automatically
✅ Dynamically generates guided prompts tailored to the problem
✅ Uses OpenAI's GPT-3.5-Turbo model for generating high-quality hints
✅ Interactive draggable UI overlay on LeetCode problem page
✅ Click Next Hint to get progressive guidance (constraints → brute force → pattern → optimal → coding plan)
✅ Built with a Node.js backend + frontend content script
✅ Supports deployment via ngrok for public access

🏗️ Tech Stack
Frontend: JavaScript (content script injected on browser)

Backend: Node.js + Express

AI Model: OpenAI GPT o3 mini API

Deployment: Localhost + ngrok (can be deployed to cloud later)

🚀 How it works
Injects a floating UI box on any problem page.

Scrapes or parses the problem title & description from the DOM or URL.

Generates contextual prompts for OpenAI.

Fetches AI-generated hints from a backend server.

Displays hints progressively with each Next Hint click.

Example prompt sequence:

Explain problem + constraints

Explain brute force

Identify optimal pattern

Explain optimal approach

Step-by-step Python coding plan

🖥️ Installation & Setup
1️⃣ Clone this repository:
bash
Copy
Edit
git clone https://github.com/anshbhanushali/codeAI.git
cd codeAI
2️⃣ Install dependencies:
bash
Copy
Edit
npm install

4️⃣ Start backend:
bash
Copy
Edit
node server.js
Server will start at http://localhost:3000.

5️⃣ Expose backend with ngrok:
bash
Copy
Edit
ngrok http 3000
Copy the HTTPS forwarding URL (e.g. https://xxxx.ngrok-free.app)

👉 Replace fetch URL inside content.js with your current ngrok URL:

js
Copy
Edit
const response = await fetch('https://xxxx.ngrok-free.app/api/generate-hint', { ... });
6️⃣ Load browser extension:
Go to chrome://extensions/

Enable Developer Mode

Click Load unpacked

Select the /codeAI folder

Navigate to https://leetcode.com and open a problem

You should see the 💡 CodeAI Helper draggable box!

📝 Usage
Click Next Hint button → progressively loads hints for the current problem.

✅ Works dynamically across problems.

✅ Supports updating backend URL as needed.
