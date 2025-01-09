const mongoose = require('mongoose');
const { type } = require('os');

const ReviewSchema = mongoose.Schema(
    {
        doctorName: { 
            type: String, 
            required: true 
        },
        
        star: {
            type: Number,
            required: true
        },

        writereview: {
            type: String,
            required: true
        }
    },

    {
        timestamps: true,
    }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;