const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  bookAppointment,
  getMyAppointments,
  cancelAppointment
} = require('../controllers/appointmentController');

// Updated: Both patients and doctors can call this to see "their" relevant list
router.get('/my-appointments', protect, authorize('patient', 'doctor'), getMyAppointments);

router.post('/book', protect, authorize('patient'), bookAppointment);
router.delete('/:appointmentId', protect, authorize('patient'), cancelAppointment);

module.exports = router;