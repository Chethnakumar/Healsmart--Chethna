const Docpro = require('../model/docpro-model'); // Use the Docpro model
const multer = require('multer');
const path = require('path');

// Configure Multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/doctors'); // Directory for uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Create or Update Doctor Profile
const createOrUpdateDocpro = async (req, res) => {
  try {
    const { email, name, specialization, contactNumber, about, qualifications } = req.body;

    // Check if docpro exists by email
    let docpro = await Docpro.findOne({ email });
    if (docpro) {
      // Update docpro profile if exists
      docpro.name = name || docpro.name;
      docpro.specialization = specialization || docpro.specialization;
      docpro.contactNumber = contactNumber || docpro.contactNumber;
      docpro.about = about || docpro.about;
      docpro.qualifications = qualifications || docpro.qualifications;

      if (req.file) {
        docpro.avatar = req.file.path.replace(/\\/g, '/'); // Save uploaded image path
      }

      await docpro.save();
      return res.status(200).json({
        success: true,
        message: 'Docpro profile updated successfully!',
      });
    }

    // Create a new docpro profile if not exists
    docpro = new Docpro({
      name,
      specialization,
      email,
      contactNumber,
      about,
      qualifications,
    });

    if (req.file) {
      docpro.avatar = req.file.path.replace(/\\/g, '/');
    }

    await docpro.save();
    return res.status(201).json({
      success: true,
      message: `Docpro profile created successfully for ${name}!`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all doctors
const getAllDocpros = async (req, res) => {
  try {
    const docpros = await Docpro.find();
    return res.status(200).json({
      success: true,
      data: docpros,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get doctor by ID
const getDocproById = async (req, res) => {
  try {
    const docpro = await Docpro.findById(req.params.id);
    if (!docpro) {
      return res.status(404).json({
        success: false,
        message: 'Docpro not found!',
      });
    }
    return res.status(200).json({
      success: true,
      data: docpro,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete doctor by ID
const deleteDocproById = async (req, res) => {
  try {
    const docpro = await Docpro.findByIdAndDelete(req.params.id);
    if (!docpro) {
      return res.status(404).json({
        success: false,
        message: 'Docpro not found!',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Docpro deleted successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrUpdateDocpro,
  getAllDocpros,
  getDocproById,
  deleteDocproById,
  upload,
};
