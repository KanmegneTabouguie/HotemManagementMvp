const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Blacklist = require('../models/blacklist');
const uuid = require('uuid');

const authService = {
    signup: async (userData) => {
        try {
            const { username, email, password, role } = userData;
            const hashedPassword = await bcrypt.hash(password, 10);
            await new Promise((resolve, reject) => {
                User.createUser({ username, email, password: hashedPassword, role }, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
            return 'User registered successfully'; // Resolve with success message
        } catch (error) {
            throw error; // Throw any error encountered during user creation
        }
    },

    login: async (email, password) => {
        try {
            // Find the user by email
            const user = await User.findByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }

            // Verify the password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            // Return the authenticated user
            return user;
        } catch (error) {
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
