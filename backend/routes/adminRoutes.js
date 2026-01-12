const express = require("express");
const router = express.Router();
const { createAdmin } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

// Only logged-in admin can add new admin
router.post("/", authMiddleware, createAdmin);

module.exports = router;
