const db = require('../config/db');

const getUserByGoogleId = async (googleId) => {
  const [user] = await db.query('SELECT * FROM users WHERE googleId = ?', [googleId]);
  return user[0];
};

const createUser = async ({ googleId, email, name }) => {
  const [result] = await db.query(
    'INSERT INTO users (googleId, email, name) VALUES (?, ?, ?)',
    [googleId, email, name]
  );
  return { id: result.insertId, googleId, email, name };
};

module.exports = { getUserByGoogleId, createUser };