const mongoose = require('mongoose');

const ServerSchema = new mongoose.Schema({
  name: String,      // server1, server2, etc
  baseUrl: String,   // base URL where media is hosted (e.g., https://cdn.example.com/media)
  priority: Number,
  healthy: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Server', ServerSchema);