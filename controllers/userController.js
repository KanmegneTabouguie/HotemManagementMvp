const userService = require('../services/userService');
const cache = require('memory-cache');

const userController = {
    createUser: async (req, res) => {
        try {
            const userRole = req.headers['x-userrole']; // Check user role
            if (userRole !== 'admin') {
                return res.status(403).json({ message: 'Only admins can create users' });
            }

            const { username, email, password, role } = req.body;
            if (!username || !email || !password || !role) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const userId = await userService.createUser({ username, email, password, role });
            cache.clear(); // Clear cache when a new user is created
            res.status(201).json({ message: 'User created successfully', userId });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    updateUser: async (req, res) => {
        try {
            const userRole = req.headers['x-userrole']; // Check user role
            if (userRole !== 'admin') {
                return res.status(403).json({ message: 'Only admins can update users' });
            }

            const userId = req.params.id;
            const updatedUserData = req.body;
            await userService.updateUser(userId, updatedUserData);
            cache.clear(); // Clear cache when a user is updated
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userRole = req.headers['x-userrole']; // Check user role
            if (userRole !== 'admin') {
                return res.status(403).json({ message: 'Only admins can delete users' });
            }

            const userId = req.params.id;
            await userService.deleteUser(userId);
            cache.clear(); // Clear cache when a user is deleted
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getUserById: async (req, res) => {
        try {
            const userRole = req.headers['x-userrole']; // Check user role
            if (userRole !== 'admin') {
                return res.status(403).json({ message: 'Only admins can get user details' });
            }

            const userId = req.params.id;
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ user });
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const userRole = req.headers['x-userrole']; // Check user role
            if (userRole !== 'admin') {
                return res.status(403).json({ message: 'Only admins can get all users' });
            }

            const users = await userService.getAllUsers();
            res.status(200).json({ users });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = userController;
