const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const router = express.Router();

router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [decoded.id]);
    if (!user[0]) return res.status(404).json({ error: 'User not found' });
    res.json(user[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;