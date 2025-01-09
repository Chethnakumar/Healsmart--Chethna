const express = require("express");
const User = require("../model/usersignup-model.js");
const router = express.Router();
const {getUs, getU, createU, updateU, deleteU} = require('../controllers/usersignup-controller.js');

router.get('/', getUs);

router.get("/:id", getU);

router.post("/", createU);

router.put("/:id", updateU);

router.delete("/:id", deleteU);

module.exports = router;