const express = require('express');
const fetch = (...args) => import('node-fetch').then(module => module.default(...args));

require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/generate-hint', async (req, res) => {
  const prompt = req.body.prompt;
  
  try {
    const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
      })
    });
    
    const data = await apiRes.json();
    const hint = data.choices[0]?.message?.content ?? "No hint generated.";
    res.json({ hint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error generating hint' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
