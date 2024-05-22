const authService = require('../services/authService');
const { addToken } = require('../tokenStore');

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
            const { user, token } = await authService.login(email, password);
            res.json({ userId: user.id, role: user.role, sessionToken: token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    },

    logout: (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = authHeader.split(' ')[1];
        addToken(token);
        res.status(200).json({ message: 'Successfully logged out' });
    }
};

module.exports = authController;
