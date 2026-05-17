const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createSlot,
  getMySlots,
  getAvailableSlots
} = require('../controllers/slotController');

// Doctor Routes
router.post('/', protect, authorize('doctor'), createSlot);
router.get('/my-slots', protect, authorize('doctor'), getMySlots);

// Patient Routes - Get Available Slots
router.get('/available', protect, authorize('patient'), getAvailableSlots);

module.exports = router;