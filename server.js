require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json());

app.post('/api/generate-hint', async (req, res) => {
  const { prompt } = req.body;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

  const apiRes = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await apiRes.json();
  const hint = data.candidates?.[0]?.content?.parts?.[0]?.text || "No hint generated.";
  res.json({ hint });
});

app.post('/api/review-code', async (req, res) => {
  const { code, problemTitle } = req.body;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

  const reviewPrompt = `You are an expert coding mentor. Review this code written for LeetCode problem "${problemTitle}". Provide constructive feedback about errors, missing cases, inefficiencies, or improvements:\n\n${code}`;

  const apiRes = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: reviewPrompt }] }]
    })
  });

  const data = await apiRes.json();
  const feedback = data.candidates?.[0]?.content?.parts?.[0]?.text || "No feedback generated.";
  res.json({ feedback });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
