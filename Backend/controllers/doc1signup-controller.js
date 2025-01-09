const bcrypt = require('bcrypt');
const DoctorModel = require('../model/doc1signup-model');

// Register a new doctor
exports.registerDoctor = async (req, res) => {
    try {
        const { name, email, phone, gender, specialty, password } = req.body;

        if (!name || !email || !phone || !gender || !specialty || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingDoctor = await DoctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = new DoctorModel({ name, email, phone, gender, specialty, password: hashedPassword });
        await newDoctor.save();

        res.status(201).json({ message: 'Doctor registered successfully', doctorId: newDoctor._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await DoctorModel.find();
        res.status(200).json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await DoctorModel.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete doctor by ID
exports.deleteDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await DoctorModel.findByIdAndDelete(id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
