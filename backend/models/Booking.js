const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
  status: { type: String, default: 'Booked' },
});

module.exports = mongoose.model('Booking', bookingSchema);
