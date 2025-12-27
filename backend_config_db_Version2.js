const mongoose = require('mongoose');

function connect(mongoUri) {
  return mongoose.connect(mongoUri, { });
}

module.exports = { connect };