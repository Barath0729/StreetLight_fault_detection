const User = require('../models/userModel');
const catchAsyncControl = require('../catchAsyncError');

// Register user
exports.registerUser = catchAsyncControl(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password
    });

    res.status(200).json({
        success: true,
        message: "User registered successfully",
        user
    });
});

// Login user
exports.loginUser = catchAsyncControl(async (req, res, next) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    // If the password matches, return success
    res.status(200).json({
        success: true,
        message: "Login successful",
    });
});
