// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');  // Use bcryptjs for hashing passwords

// const userSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['admin', 'doctor', 'user'], required: true }
// });

// // Hash the password before saving it to the database
// userSchema.pre('save', async function(next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

// const User = mongoose.model('User', userSchema);
// module.exports = User;
