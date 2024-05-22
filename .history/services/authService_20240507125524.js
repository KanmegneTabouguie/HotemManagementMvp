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

    login: async (email, password, secretKey) => { // Accept secretKey as a parameter
        try {
            console.log('Attempting to find user by email:', email);
            const user = await User.findByEmail(email);
            if (!user) {
                console.log('User not found');
                throw new Error('User not found');
            }
    
            console.log('User found. Verifying password...');
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                console.log('Invalid password');
                throw new Error('Invalid password');
            }
    
            console.log('Password verified. Generating token...');
            // Generate the token using the provided secret key
            const token = jwt.sign(
                { userId: user.id, userType: user.role }, // Payload
                secretKey, // Secret key
                { expiresIn: '1h' } // Options: expires in 1 hour
            );
    
            console.log('Token generated successfully');
            return token;
        } catch (error) {
            console.error('Authentication failed:', error.message);
            throw new Error('Authentication failed');
        }
    }
    ,
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
