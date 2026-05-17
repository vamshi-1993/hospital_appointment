const Appointment = require('../models/Appointment');
const Slot = require('../models/Slot');

exports.bookAppointment = async (req, res) => {
  try {
    const { slotId } = req.body;
    const patientId = req.user.id;

    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    if (slot.isBooked) return res.status(400).json({ message: 'Slot already booked' });

    // We take the doctor ID directly from the slot to ensure a perfect match
    const appointment = await Appointment.create({
      patient: patientId,
      doctor: slot.doctor, 
      slot: slotId
    });

    slot.isBooked = true;
    await slot.save();

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    let query = { status: 'booked' };

    if (req.user.role === 'doctor') {
      query.doctor = req.user.id;
    } else {
      query.patient = req.user.id;
    }

    // Console log for debugging - check your terminal!
    console.log(`Fetching appointments for ${req.user.role}: ${req.user.id}`);

    const appointments = await Appointment.find(query)
      .populate('patient', 'username email') 
      .populate('doctor', 'username category')
      .populate('slot');
      
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    if (appointment.patient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    await Slot.findByIdAndUpdate(appointment.slot, { isBooked: false });

    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};