const mongoose = require('mongoose');

const docproSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null, // Store image file path if the doctor uploads a profile picture
  },
  about: {
    type: String,
    default: '',
  },
  qualifications: {
    type: String,
    default: '',
  },
});

const Docpro = mongoose.model('Docpro', docproSchema); // Changed the model name to Docpro

module.exports = Docpro;
