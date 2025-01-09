const Userpro = require('../model/userpro-model');
const multer = require('multer');
const path = require('path');

// Configure Multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/users'); // Directory for uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Create or Update User Profile
const createOrUpdateUserpro = async (req, res) => {
  try {
    const { email, name, phoneNumber, bio, address, preferences } = req.body;

    // Check if userpro exists by email
    let userpro = await Userpro.findOne({ email });
    if (userpro) {
      // Update userpro profile if exists
      userpro.name = name || userpro.name;
      userpro.phoneNumber = phoneNumber || userpro.phoneNumber;
      userpro.bio = bio || userpro.bio;
      userpro.address = address || userpro.address;
      userpro.preferences = preferences || userpro.preferences;

      if (req.file) {
        userpro.profileImage = req.file.path.replace(/\\/g, '/');
      }

      await userpro.save();
      return res.status(200).json({
        success: true,
        message: 'User profile updated successfully!',
      });
    }

    // Create a new userpro profile if not exists
    userpro = new Userpro({
      email,
      name,
      phoneNumber,
      bio,
      address,
      preferences,
    });

    if (req.file) {
      userpro.profileImage = req.file.path.replace(/\\/g, '/');
    }

    await userpro.save();
    return res.status(201).json({
      success: true,
      message: `User profile created successfully for ${name}!`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all user profiles
const getAllUserpros = async (req, res) => {
  try {
    const userpros = await Userpro.find();
    return res.status(200).json({
      success: true,
      data: userpros,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user profile by ID
const getUserproById = async (req, res) => {
  try {
    const userpro = await Userpro.findById(req.params.id);
    if (!userpro) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found!',
      });
    }
    return res.status(200).json({
      success: true,
      data: userpro,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete user profile by ID
const deleteUserproById = async (req, res) => {
  try {
    const userpro = await Userpro.findByIdAndDelete(req.params.id);
    if (!userpro) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found!',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User profile deleted successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrUpdateUserpro,
  getAllUserpros,
  getUserproById,
  deleteUserproById,
  upload,
};
