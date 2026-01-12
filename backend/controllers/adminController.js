const Admin = require("../models/Admin");

// Create new admin
exports.createAdmin = async (req, res) => {
  try {
    const { adminName, email, role } = req.body;

    const admin = new Admin({ adminName, email, role });
    await admin.save();

    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
