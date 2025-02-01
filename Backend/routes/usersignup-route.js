const express = require("express");
const multer = require("multer");
const { userSignup, getUser, getAllUsers, updateUser, deleteUser } = require("../controllers/usersignup-controller");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("profilePicture"), userSignup);

// GET: Single User
router.get("/:id", getUser);

// GET: All Users
router.get("/", getAllUsers);

// PUT: Update User
router.put("/user/:id", upload.single("profilePicture"), updateUser); // Update user route


// DELETE: Delete User
router.delete("/:id", deleteUser);

module.exports = router;
