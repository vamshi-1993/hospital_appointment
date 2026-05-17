const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['patient', 'doctor', 'admin'], 
    required: true 
  },
  category: { 
    type: String, 
    enum: ['Cardiologists', 'Dermatologists', 'Endocrinologists', 'Gastroenterologists', 
           'Neurologists', 'Pediatricians', 'Gynecologists'],
    required: function() { return this.role === 'doctor'; }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);