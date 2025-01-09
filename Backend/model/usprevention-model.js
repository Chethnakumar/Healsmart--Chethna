const mongoose = require('mongoose');

// Injury Schema
const injurySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
});

// Activity Schema
const activitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
});

// Models
const Injury = mongoose.model('Injury', injurySchema);
const Activity = mongoose.model('Activity', activitySchema);

module.exports = { Injury, Activity };
