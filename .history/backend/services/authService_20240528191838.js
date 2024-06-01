const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET;

const authService = {
    signup: async (userData) => {
        try {
            const { username, email, password, role } = userData;
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.createUser({ username, email, password: hashedPassword, role });
            // No need to return anything here, just await the createUser function call
        } catch (error) {
            throw error;
        }
    },

    login: async (email, password) => {
        try {
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
            throw new Error('Authentication failed');
        }
    }
};

module.exports = authService;
