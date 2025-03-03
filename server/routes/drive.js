const express = require('express');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

router.post('/save-to-drive', async (req, res) => {
  const { token, content } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  oauth2Client.setCredentials({ access_token: token });
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  const fileMetadata = {
    name: 'MyLetter.docx',
    mimeType: 'application/vnd.google-apps.document',
  };
  const media = {
    mimeType: 'text/plain',
    body: content,
  };

  const file = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: 'id',
  });

  res.json({ fileId: file.data.id });
});

module.exports = router;