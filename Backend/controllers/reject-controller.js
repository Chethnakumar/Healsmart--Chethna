const Rejection = require('../model/reject-model');

// Create a new rejection entry
exports.rejectDoctor = async (req, res) => {
    const { doctorId, rejectedBy, reason } = req.body;

    if (!doctorId || !rejectedBy || !reason) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const rejection = new Rejection({
            doctorId,
            rejectedBy,
            reason,
        });

        await rejection.save();
        res.status(201).json({ message: 'Rejection recorded successfully.', rejection });
    } catch (error) {
        console.error('Error rejecting doctor:', error);
        res.status(500).json({ message: 'An error occurred while processing the rejection.' });
    }
};

// Fetch all rejections
exports.getRejections = async (req, res) => {
    try {
        const rejections = await Rejection.find()
            .populate('doctorId', 'name email')
            .populate('rejectedBy', 'name email');
        res.status(200).json(rejections);
    } catch (error) {
        console.error('Error fetching rejections:', error);
        res.status(500).json({ message: 'An error occurred while fetching rejections.' });
    }
};

// Delete a rejection entry
exports.deleteRejection = async (req, res) => {
    const { id } = req.params;

    try {
        const rejection = await Rejection.findByIdAndDelete(id);

        if (!rejection) {
            return res.status(404).json({ message: 'Rejection not found.' });
        }

        res.status(200).json({ message: 'Rejection deleted successfully.' });
    } catch (error) {
        console.error('Error deleting rejection:', error);
        res.status(500).json({ message: 'An error occurred while deleting the rejection.' });
    }
};
