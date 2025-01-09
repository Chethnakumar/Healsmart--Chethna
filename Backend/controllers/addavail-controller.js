const Availability = require('../model/addavail-model');

// Controller function to add availability
const addAvailability = async (req, res) => {
    try {
        // Create a new availability document from the form data
        const newAvailability = new Availability({
            fromDate: req.body.fromDate,
            tillDate: req.body.tillDate,
            timeFrom: req.body.timeFrom,
            timeTill: req.body.timeTill,
            service: req.body.service
        });

        // Save to the database
        await newAvailability.save();

        // Send a success response
        res.status(201).json({
            message: 'Availability added successfully!',
            availability: newAvailability
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error adding availability.',
            error: error.message
        });
    }
};

// Export the controller functions
module.exports = {
    addAvailability
};
