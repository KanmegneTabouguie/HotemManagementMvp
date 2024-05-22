// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Signup method
exports.signup = async (req, res) => {
    try {
        // Extract user data from request body
        const { username, password, email } = req.body;

        // Check if user already exists
        User.findByEmail(email, (error, existingUser) => {
            if (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            bcrypt.hash(password, 10, (error, hashedPassword) => {
                if (error) {
                    return res.status(500).json({ message: 'Internal server error' });
                }
                const userData = { username, password: hashedPassword, email };

                // Create new user
                User.createUser(userData, (error, userId) => {
                    if (error) {
                        return res.status(500).json({ message: 'Internal server error' });
                    }
                    res.status(201).json({ message: 'User created successfully', userId });
                });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login method
exports.login = async (req, res) => {
    try {
        // Extract login credentials from request body
        const { email, password } = req.body;

        // Check if user exists
        User.findByEmail(email, (error, user) => {
            if (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Verify password
            bcrypt.compare(password, user.password, (error, isPasswordValid) => {
                if (error) {
                    return res.status(500).json({ message: 'Internal server error' });
                }
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid email or password' });
                }

                // Generate JWT token
                const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
                res.status(200).json({ message: 'Login successful', token });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Logout method (not implemented for JWT)
exports.logout = (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
};
