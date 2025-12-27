const mongoose = require('mongoose');

const TranscodeJobSchema = new mongoose.Schema({
  inputPath: String,
  outputPrefix: String,
  basename: String,
  episodeRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Episode' },
  status: { type: String, enum: ['queued','processing','done','failed'], default: 'queued' },
  error: String,
  createdAt: { type: Date, default: Date.now },
  finishedAt: Date
});

module.exports = mongoose.model('TranscodeJob', TranscodeJobSchema);