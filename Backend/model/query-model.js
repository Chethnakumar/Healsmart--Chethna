const mongoose = require('mongoose');

// Define the schema for queries
const querySchema = new mongoose.Schema(
    {
        doctorName: { 
            type: String, 
            required: true 
        },
        
        writequery: {
            type: String,
            required: true
        }
    }
);

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
