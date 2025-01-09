const Doc2Signup = require('../model/doc2signup-model'); // Use the Doc2Signup model
const multer = require('multer');
const path = require('path');

// Configure Multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/doctors'); // Directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

// File filter to allow only specific file types (image files, PDF, etc.)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only image and PDF files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Create new Doc2Signup or update if exists
const createDoc2Signup = async (req, res) => {
  try {
    const { doctorName, registrationNumber, registrationYear } = req.body;

    // Check if doctor already exists in the system (if needed)
    let doc2Signup = new Doc2Signup({
      doctorName,
      registrationNumber,
      registrationYear,
      degreeCertificate: req.files.degreeCertificate[0].path.replace(/\\/g, '/'),
      idProof: req.files.idProof[0].path.replace(/\\/g, '/'),
    });

    await doc2Signup.save();
    return res.status(201).json({
      success: true,
      message: 'Doc2Signup created successfully!',
      data: doc2Signup,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all Doc2Signup records
const getAllDoc2Signups = async (req, res) => {
  try {
    const doc2Signups = await Doc2Signup.find();
    return res.status(200).json({
      success: true,
      data: doc2Signups,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Doc2Signup by ID
const getDoc2SignupById = async (req, res) => {
  try {
    const doc2Signup = await Doc2Signup.findById(req.params.id);
    if (!doc2Signup) {
      return res.status(404).json({
        success: false,
        message: 'Doc2Signup not found!',
      });
    }
    return res.status(200).json({
      success: true,
      data: doc2Signup,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Doc2Signup by ID
const deleteDoc2SignupById = async (req, res) => {
  try {
    const doc2Signup = await Doc2Signup.findByIdAndDelete(req.params.id);
    if (!doc2Signup) {
      return res.status(404).json({
        success: false,
        message: 'Doc2Signup not found!',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Doc2Signup deleted successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDoc2Signup,
  getAllDoc2Signups,
  getDoc2SignupById,
  deleteDoc2SignupById,
  upload,
};
