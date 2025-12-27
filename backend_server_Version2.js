const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const episodesRoutes = require('./routes/episodes');
const uploadRoutes = require('./routes/upload');
const serversRoutes = require('./routes/servers');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/anime';
mongoose.connect(MONGO_URI, { })
  .then(() => console.log('Mongo connected'))
  .catch(err => console.error('Mongo error', err));

app.use('/api/auth', authRoutes);
app.use('/api/episodes', episodesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/servers', serversRoutes);

// serve media from /media when testing local (Nginx will serve it)
app.use('/media', express.static(path.join(__dirname, '..', 'media')));

app.get('/', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV || 'dev' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));