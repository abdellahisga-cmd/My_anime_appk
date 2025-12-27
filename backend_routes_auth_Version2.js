const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'verysecret';

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    let u = new User({ email, name });
    await u.setPassword(password);
    await u.save();
    const token = jwt.sign({ id: u._id, role: u.role }, JWT_SECRET);
    res.json({ token, user: { id: u._id, email: u.email, name: u.name }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await u.validatePassword(password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: u._id, role: u.role }, JWT_SECRET);
  res.json({ token, user: { id: u._id, email: u.email, name: u.name }});
});

module.exports = router;