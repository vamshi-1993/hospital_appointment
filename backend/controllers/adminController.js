const User = require('../models/User');
const Appointment = require('../models/Appointment');

exports.getAllPatients = async (req, res) => {
  const patients = await User.find({ role: 'patient' }).select('-password');
  res.json(patients);
};

exports.getAllDoctors = async (req, res) => {
  const doctors = await User.find({ role: 'doctor' }).select('-password');
  res.json(doctors);
};

exports.getAllAppointments = async (req, res) => {
  try {
    // Only show active bookings to Admin
    const appointments = await Appointment.find({ status: 'booked' })
      .populate('patient', 'username')
      .populate('doctor', 'username category')
      .populate('slot');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: 'User deleted successfully' });
};

exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;
  const app = await Appointment.findById(id);
  if (app) {
    const Slot = require('../models/Slot');
    await Slot.findByIdAndUpdate(app.slot, { isBooked: false });
  }
  await Appointment.findByIdAndDelete(id);
  res.json({ message: 'Appointment deleted successfully' });
};