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

    
login: async (email, password) => {
    try {
        const user = await User.findByEmail(email);
        if (!user) throw new Error('User not found');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid password');

        // Generate the token using the generated secret key
        const token = jwt.sign(
            { userId: user.id, userType: user.role }, // Payload
            secretKey, // Secret key
            { expiresIn: '1h' } // Options: expires in 1 hour
        );

        return token;
    } catch (error) {
        throw new Error('Authentication failed');
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
