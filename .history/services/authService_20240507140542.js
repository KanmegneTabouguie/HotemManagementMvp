const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Blacklist = require('../models/blacklist');
const uuid = require('uuid');

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
    
            console.log('Password verified. Generating session token...');
            // Generate a unique session token using uuid
            const sessionToken = uuid.v4();
    
            console.log('Session token generated successfully');
            return sessionToken;
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
