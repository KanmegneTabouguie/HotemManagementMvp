const authService = require('../services/authService');
const uuid = require('uuid');
const logger = require('../utils/logger'); // Assume you have a logger utility

const authController = {
    signup: async (req, res) => {
        try {
            const { username, email, password, role } = req.body;
            if (!username || !email || !password || !role) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            await authService.signup({ username, email, password, role });
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            logger.error('Signup error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const { user, token } = await authService.login(email, password);
            res.json({ userId: user.id, role: user.role, token });
        } catch (error) {
            logger.error('Login error:', error);
            res.status(401).json({ message: error.message });
        }
    },

    logout: async (req, res) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({ message: 'Token is required' });
            }
            await authService.logout(token);
            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            logger.error('Logout error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = authController;
