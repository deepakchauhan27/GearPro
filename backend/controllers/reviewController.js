const Review = require("../models/Review");

// Add review
exports.addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const review = new Review({
      userId: req.user.userId,
      productId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product reviews
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).populate("userId", "name");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
