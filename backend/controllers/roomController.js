const Room = require('../models/Room');

// @desc    Get all rooms
exports.getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

// @desc    Get room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create new room (Admin only)
exports.createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update room
exports.updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRoom);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete room
exports.deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
