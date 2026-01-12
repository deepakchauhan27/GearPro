const express = require("express");
const router = express.Router();
const {
  addReview,
  getProductReviews
} = require("../controllers/reviewController");

const authMiddleware = require("../middleware/authMiddleware");

// Public route to get reviews for a product
router.get("/:productId", getProductReviews);

// Protected route for adding a review
router.post("/", authMiddleware, addReview);

module.exports = router;
