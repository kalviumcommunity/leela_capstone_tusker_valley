const Booking = require('../models/Booking');
const Room = require('../models/Room');

// @desc    Create a booking
exports.createBooking = async (req, res) => {
  const { room, startDate, endDate, totalPrice } = req.body;

  try {
    const booking = new Booking({
      user: req.user.id,
      room,
      startDate,
      endDate,
      totalPrice
    });

    const savedBooking = await booking.save();

    await Room.findByIdAndUpdate(room, { isAvailable: false });

    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get bookings of logged-in user
exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate('room');
  res.json(bookings);
};

// @desc    Get all bookings (admin)
exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate('user').populate('room');
  res.json(bookings);
};

// @desc    Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'Cancelled';
    await booking.save();

    await Room.findByIdAndUpdate(booking.room, { isAvailable: true });

    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
