const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
  title: String,
  description: String,
  coverUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Show', ShowSchema);