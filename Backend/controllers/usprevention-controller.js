const { Injury, Activity } = require('../model/usprevention-model');

// Get all injuries
const getAllInjuries = async (req, res) => {
    try {
        const injuries = await Injury.find();
        res.status(200).json(injuries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching injuries', error });
    }
};

// Get injury by ID
const getInjuryById = async (req, res) => {
    try {
        const { id } = req.params;
        const injury = await Injury.findById(id);
        if (!injury) return res.status(404).json({ message: 'Injury not found' });
        res.status(200).json(injury);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching injury', error });
    }
};

// Create new injury
const createInjury = async (req, res) => {
    try {
        const { name, image, description } = req.body;
        const injury = new Injury({ name, image, description });
        await injury.save();
        res.status(201).json(injury);
    } catch (error) {
        res.status(500).json({ message: 'Error creating injury', error });
    }
};

// Delete injury
const deleteInjury = async (req, res) => {
    try {
        const { id } = req.params;
        const injury = await Injury.findByIdAndDelete(id);
        if (!injury) return res.status(404).json({ message: 'Injury not found' });
        res.status(200).json({ message: 'Injury deleted successfully', injury });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting injury', error });
    }
};

// Get all activities
const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching activities', error });
    }
};

// Get activity by ID
const getActivityById = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity.findById(id);
        if (!activity) return res.status(404).json({ message: 'Activity not found' });
        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching activity', error });
    }
};

// Create new activity
const createActivity = async (req, res) => {
    try {
        const { name, image, description } = req.body;
        const activity = new Activity({ name, image, description });
        await activity.save();
        res.status(201).json(activity);
    } catch (error) {
        res.status(500).json({ message: 'Error creating activity', error });
    }
};

// Delete activity
const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity.findByIdAndDelete(id);
        if (!activity) return res.status(404).json({ message: 'Activity not found' });
        res.status(200).json({ message: 'Activity deleted successfully', activity });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting activity', error });
    }
};

module.exports = {
    getAllInjuries,
    getInjuryById,
    createInjury,
    deleteInjury,
    getAllActivities,
    getActivityById,
    createActivity,
    deleteActivity,
};
