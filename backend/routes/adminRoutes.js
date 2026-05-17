const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllPatients,
  getAllDoctors,
  getAllAppointments,
  deleteUser,
  deleteAppointment
} = require('../controllers/adminController');

// All Admin Routes
router.get('/patients', protect, authorize('admin'), getAllPatients);
router.get('/doctors', protect, authorize('admin'), getAllDoctors);
router.get('/appointments', protect, authorize('admin'), getAllAppointments);

router.delete('/users/:id', protect, authorize('admin'), deleteUser);
router.delete('/appointments/:id', protect, authorize('admin'), deleteAppointment);

module.exports = router;