const Payment = require("../models/Payment");

exports.addPayment = async (req, res) => {
  try {
    const { orderId, amount, paymentMethod, status, transactionId } = req.body;

    const payment = new Payment({
      userId: req.user.userId,
      orderId,
      amount,
      paymentMethod,
      status,
      transactionId,
    });

    await payment.save();
    res.status(201).json({ message: "Payment recorded successfully", payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
