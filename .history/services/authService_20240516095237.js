const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger'); // Assume you have a logger utility
require('dotenv').config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authService = {
    signup: async (userData) => {
        try {
            const { username, email, password, role } = userData;

            // Validate user data (you can use a library like Joi for this)
            if (!username || !email || !password || !role) {
                throw new Error('All fields are required');
            }

            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            await new Promise((resolve, reject) => {
                User.createUser({ username, email, password: hashedPassword, role }, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
            return 'User registered successfully';
        } catch (error) {
            logger.error('Error during user registration:', error);
            throw new Error('User registration failed');
        }
    },

    login: async (email, password) => {
        try {
            if (!email || !password) {
                throw new Error('Email and password are required');
            }

            const user = await User.findByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
            return { user, token };
        } catch (error) {
            logger.error('Error during user login:', error);
            throw new Error('Authentication failed');
        }
    },

    logout: async (token) => {
        // Implement token invalidation logic (e.g., storing invalidated tokens in a database)
        return 'Logout successful';
    }
};

module.exports = authService;
