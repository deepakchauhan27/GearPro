const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getUserOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

// Protected routes
router.post("/", authMiddleware, placeOrder);
router.get("/", authMiddleware, getUserOrders);

// Admin - update order status
router.put("/:id/status", authMiddleware, updateOrderStatus);

module.exports = router;
