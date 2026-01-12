const Order = require("../models/Order");

// Place a new order
exports.placeOrder = async (req, res) => {
  try {
    const { items, totalPrice, paymentStatus } = req.body;

    const order = new Order({
      userId: req.user.userId,
      items,
      totalPrice,
      status: "Pending",
      paymentStatus,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).populate("items.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
