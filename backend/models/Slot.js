const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isBooked: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Slot', slotSchema);