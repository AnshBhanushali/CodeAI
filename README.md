# CodeAI 💡 — AI-powered Problem Solving Coding Assistant

Welcome to **CodeAI**, an AI-driven coding assistant that integrates directly into LeetCode to provide step-by-step explanations, hints, and coding plans for any problem — all while you're solving it!

---

## ✨ Features

✅ Detects the current LeetCode problem title and description automatically
✅ Dynamically generates guided prompts tailored to the problem
✅ Uses OpenAI's GPT o3 mini API for generating high-quality hints
✅ Interactive draggable UI overlay on LeetCode problem page
✅ Click **Next Hint** to get progressive guidance (constraints → brute force → pattern → optimal → coding plan)
✅ Built with a Node.js backend + frontend content script
✅ Supports deployment via ngrok for public access

---

## 🏗️ Tech Stack

* **Frontend:** JavaScript (content script injected on browser)
* **Backend:** Node.js + Express
* **AI Model:** OpenAI GPT o3 mini API
* **Deployment:** Localhost + ngrok (can be deployed to cloud later)

---

## 🚀 How it works

* Injects a floating UI box on any problem page.
* Scrapes or parses the problem title & description from the DOM or URL.
* Generates contextual prompts for OpenAI.
* Fetches AI-generated hints from a backend server.
* Displays hints progressively with each **Next Hint** click.

**Example prompt sequence:**

1. Explain problem + constraints
2. Explain brute force
3. Identify optimal pattern
4. Explain optimal approach
5. Step-by-step Python coding plan

---

## 🖥️ Installation & Setup

1️⃣ **Clone this repository:**

```bash
git clone https://github.com/anshbhanushali/CodeAI.git
cd CodeAI
```

2️⃣ **Install dependencies:**

```bash
npm install
```

4️⃣ **Start backend:**

```bash
node server.js
```

Server will start at `http://localhost:3000`.

5️⃣ **Expose backend with ngrok:**

```bash
ngrok http 3000
```

Copy the HTTPS forwarding URL (e.g. `https://xxxx.ngrok-free.app`)

👉 Replace fetch URL inside `content.js` with your current ngrok URL:

```js
const response = await fetch('https://xxxx.ngrok-free.app/api/generate-hint', { ... });
```

6️⃣ **Load browser extension:**

* Go to `chrome://extensions/`
* Enable **Developer Mode**
* Click **Load unpacked**
* Select the `/codeAI` folder
* You should see the **💡 CodeAI Helper** draggable box!

---

## 📝 Usage

Click **Next Hint** button → progressively loads hints for the current problem.

✅ Works dynamically across problems.
✅ Supports updating backend URL as needed.

