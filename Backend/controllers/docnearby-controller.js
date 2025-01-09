const Doctor = require('../model/docnearby-model');

// Get doctors by city
const getDoctorsByCity = async (req, res) => {
    try {
        const city = req.params.city;
        const doctors = await Doctor.find({ city });
        if (!doctors.length) {
            return res.status(404).json({ message: 'No doctors found for this city' });
        }
        res.status(200).json(doctors);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching doctors', error: err });
    }
};

// Add a new doctor
const addDoctor = async (req, res) => {
    try {
        const { name, speciality, city, photo, link } = req.body;
        const newDoctor = new Doctor({ name, speciality, city, photo, link });
        await newDoctor.save();
        res.status(201).json(newDoctor);
    } catch (err) {
        res.status(500).json({ message: 'Error adding doctor', error: err });
    }
};

module.exports = {
    getDoctorsByCity,
    addDoctor
};
