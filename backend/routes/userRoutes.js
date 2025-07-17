const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  getAllUsers // ✅ added
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);

// ✅ GET all users (not protected, but can add protect middleware later)
router.get('/', getAllUsers);

module.exports = router;
