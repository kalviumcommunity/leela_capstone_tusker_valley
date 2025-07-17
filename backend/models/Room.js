const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: String,
  price: Number,
  capacity: Number,
  description: String,
  isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model('Room', roomSchema);
