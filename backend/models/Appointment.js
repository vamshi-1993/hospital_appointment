const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  slot: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Slot', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['booked', 'cancelled'], 
    default: 'booked' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);