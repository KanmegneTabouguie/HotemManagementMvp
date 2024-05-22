const authService = require('../services/authService');

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
            console.error('Signup error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
            const token = await authService.login(email, password);
            res.status(200).json({ token });
        } catch (error) {
            console.error('Login error:', error);
            res.status(401).json({ message: 'Invalid credentials' });
        }
    },

    logout: async (req, res) => {
        try {
            const token = req.headers.authorization;
            const result = await authService.logout(token);
            res.status(200).json(result);
        } catch (error) {
            console.error('Logout error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = authController;
