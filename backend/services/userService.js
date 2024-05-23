const User = require('../models/user');
const bcrypt = require('bcrypt');

const userService = {
    createUser: async (userData) => {
        try {
            const { username, email, password, role } = userData;
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

            // Create a new user object with hashed password
            const newUser = {
                username,
                email,
                password: hashedPassword, // Use the hashed password
                role
            };

            return User.createUser(newUser);
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (userId, updatedUserData) => {
        try {
            // Check if password is being updated
            if (updatedUserData.password) {
                const hashedPassword = await bcrypt.hash(updatedUserData.password, 10); // Hash the new password
                updatedUserData.password = hashedPassword; // Update the password with hashed one
            }
            
            return User.updateUser(userId, updatedUserData);
        } catch (error) {
            throw error;
        }
    },


    deleteUser: (userId) => {
        return User.deleteUser(userId);
    },

    getUserById: (userId) => {
        return User.getUserById(userId);
    },

    getAllUsers: () => {
        return User.getAllUsers();
    }
};

module.exports = userService;
