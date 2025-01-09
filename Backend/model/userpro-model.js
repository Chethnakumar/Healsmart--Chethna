const mongoose = require('mongoose');

const userproSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  profileImage: { type: String },
  bloodGroup: { type: String },
  address: { type: String },
}, { timestamps: true });

const Userpro = mongoose.model('Userpro', userproSchema);

module.exports = Userpro;
