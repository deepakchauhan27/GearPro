const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart
} = require("../controllers/cartController");

const authMiddleware = require("../middleware/authMiddleware");

// Protected routes
router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete("/remove", authMiddleware, removeFromCart);

module.exports = router;
