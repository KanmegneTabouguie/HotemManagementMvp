const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authService = {
    signup: async (userData) => {
        const { username, email, password, role } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
            User.createUser({ username, email, password: hashedPassword, role }, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    },

    login: async (email, password) => {
        const user = await User.findByEmail(email);
        if (!user) throw new Error('User not found');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid password');
        const token = jwt.sign({ userId: user.id }, '922da06d39fddd27efe159bcecbd2db3c5c0f71c2e5b898559497c34d9c459e0', { expiresIn: '1h' });
        return token;
    }

    logout: async (token) => {
        try {
            if (!token) throw new Error('Token is required');
            await Blacklist.addToken(token);
            return { message: 'Logout successful' };
        } catch (error) {
            throw error;
        }
    }

    
};

module.exports = authService;
