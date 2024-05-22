const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Blacklist = require('../models/blacklist');

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
        try {
            const user = await User.findByEmail(email);
            if (!user) throw new Error('User not found');
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) throw new Error('Invalid password');
    
            // Generate the token using jsonwebtoken
            const token = jwt.sign(
                { userId: user.id, userType: user.role }, // Payload
                'your_secret_key', // Secret key
                { expiresIn: '1h' } // Options: expires in 1 hour
            );
    
            return token;
        } catch (error) {
            throw new Error('Authentication failed');
        }
    } ,
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
