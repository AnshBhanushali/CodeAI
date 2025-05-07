const express = require('express');
const { google } = require('googleapis');

const app = express();
const PORT = 3000;

// ✅ paste your credentials here
const CLIENT_ID = '213826089274-ljssk25v9c66aemjc893nuht36orlhng.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// ✅ Add this scope for Gemini API
const SCOPES = ['https://www.googleapis.com/auth/generative-language.text.generate'];

app.get('/auth', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // required to get refresh_token
    scope: SCOPES,
    prompt: 'consent' // always ask for consent → ensures refresh_token returned
  });
  res.redirect(authUrl);
});

app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  console.log('✅ Tokens acquired:', tokens);

  res.send('✅ Authentication successful! You can close this tab.');

  // OPTIONAL: make a sample API call to Gemini API
  const fetch = (...args) => import('node-fetch').then(module => module.default(...args));

  const apiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokens.access_token}`
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: 'Explain Two Sum in simple terms.' }] }]
    })
  });
  const data = await apiRes.json();
  console.log('✅ API response:', data);
});

app.listen(PORT, () => {
  console.log(`Visit http://localhost:${PORT}/auth to begin OAuth flow`);
});
