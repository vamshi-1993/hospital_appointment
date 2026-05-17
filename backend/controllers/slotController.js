const Slot = require('../models/Slot');
const Appointment = require('../models/Appointment');

exports.createSlot = async (req, res) => {
  try {
    const { startTime, endTime } = req.body;
    const doctorId = req.user.id;

    const slot = await Slot.create({
      doctor: doctorId,
      startTime: new Date(startTime),
      endTime: new Date(endTime)
    });

    res.status(201).json({ message: 'Slot created successfully', slot });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMySlots = async (req, res) => {
  try {
    const slots = await Slot.find({ doctor: req.user.id }).sort({ startTime: 1 });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const slots = await Slot.find({ isBooked: false })
      .populate('doctor', 'username category')
      .sort({ startTime: 1 });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};