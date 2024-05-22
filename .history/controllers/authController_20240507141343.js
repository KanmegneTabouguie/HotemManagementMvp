const authService = require('../services/authService');
const uuid = require('uuid');

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
            // Call the authService to authenticate the user
            const user = await authService.login(email, password);
            
            // Generate a unique session token
            const sessionToken = uuid.v4();

            // Save the session token to the database or wherever needed
            // For demonstration, let's assume we save it to the user object
            user.sessionToken = sessionToken;

            // Return the session token, user ID, and role to the client
            res.json({ userId: user.id, role: user.role, sessionToken });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
    ,
    
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
