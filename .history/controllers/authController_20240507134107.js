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
        const { email, password } = req.body;
        try {
            const secretKey = '71905540f68219e68d5ede31a7a9a07c50473fd1c6ecd9570952528a6549c485';
            const token = await authService.login(email, password, secretKey);
            res.json({ token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    },
    
    logout: async (req, res) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({ message: 'Token is required' });
            }
            const result = await authService.logout(token);
            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            console.error('Logout error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = authController;
