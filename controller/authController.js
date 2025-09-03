const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require("../utils/generateToken");

async function Signup(req, res) {
    try {
        const { name, email, password } = req.body;

        // 1. Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // 2. Normalize email
        const emailNormalized = email.toLowerCase().trim();

        // 3. Check if user already exists
        const existingUser = await User.findOne({ email: emailNormalized });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 4. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Save user
        const newUser = new User({
            name,
            email: emailNormalized,
            password: hashedPassword,
            role: "author" // default role
        });

        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: savedUser });
        console.log(savedUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



// // POST /api/auth/login
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // ✅ Update lastLogin
        user.lastLogin = Date.now();
        await user.save();

        // Generate JWT token
        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Server error, please try again later" });
    }
};


module.exports = { Login , Signup} ;




