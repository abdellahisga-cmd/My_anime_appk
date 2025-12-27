const mongoose = require('mongoose');

const EpisodeSchema = new mongoose.Schema({
  title: String,
  description: String,
  show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show' },
  episodeNumber: Number,
  servers: [
    {
      name: String,          // server1, server2, server3
      hlsUrl: String,        // full URL to master.m3u8
      priority: Number
    }
  ],
  subtitles: [
    {
      lang: String,
      url: String
    }
  ],
  duration: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Episode', EpisodeSchema);