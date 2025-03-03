const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { getUserByGoogleId, createUser } = require('../models/userModel');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google-login', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    // Check if user exists in the database
    let user = await getUserByGoogleId(googleId);
    if (!user) {
      // Create a new user if they don't exist
      user = await createUser({ googleId, email, name });
    }

    // Generate JWT token
    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token: jwtToken, user });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;