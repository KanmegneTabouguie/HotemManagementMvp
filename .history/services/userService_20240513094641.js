const User = require('../models/user');

const userService = {
    createUser: (userData) => {
        return User.createUser(userData);
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
