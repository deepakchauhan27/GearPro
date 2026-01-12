const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route - get user profile
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
