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

    updateUser: (userId, updatedUserData) => {
        return User.updateUser(userId, updatedUserData);
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
