const Availability = require('../model/addavail-model');

// Controller function to add availability
const addAvailability = async (req, res) => {
    try {
        const newAvailability = new Availability({
            fromDate: req.body.fromDate,
            tillDate: req.body.tillDate,
            timeFrom: req.body.timeFrom,
            timeTill: req.body.timeTill,
            service: req.body.service
        });
        
        await newAvailability.save();
        res.status(201).json({
            message: 'Availability added successfully!',
            availability: newAvailability
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding availability.', error: error.message });
    }
};

// Controller function to get a single availability by ID
const getAvailabilityById = async (req, res) => {
    try {
        const availability = await Availability.findById(req.params.id);
        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }
        res.status(200).json(availability);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving availability.', error: error.message });
    }
};

// Controller function to get all availability records
const getAllAvailability = async (req, res) => {
    try {
        const availabilities = await Availability.find();
        res.status(200).json(availabilities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving availabilities.', error: error.message });
    }
};

// Controller function to delete a specific time slot
const deleteTimeSlot = async (req, res) => {
    try {
        const availability = await Availability.findOne({ _id: req.params.id });

        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }

        // Find the specific time slot by matching timeFrom and timeTill
        const timeSlotIndex = availability.timeSlots.findIndex(slot => 
            slot.timeFrom === req.body.timeFrom && slot.timeTill === req.body.timeTill
        );

        if (timeSlotIndex === -1) {
            return res.status(404).json({ message: 'Time slot not found' });
        }

        // Remove the time slot
        availability.timeSlots.splice(timeSlotIndex, 1);
        await availability.save();

        res.json({ message: 'Time slot removed successfully' });
    } catch (error) {
        console.error("Error removing time slot:", error);
        res.status(500).json({ message: 'Error removing time slot.', error: error.message });
    }
};

// Export the controller functions
module.exports = {
    addAvailability,
    getAvailabilityById,
    getAllAvailability,
    deleteTimeSlot   // Exporting the delete function
};
