const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { adminMiddleware } = require('../middleware/authMiddleware');
const cacheMiddleware = require('../cache'); // Import the cache middleware


// Create a new user (admin-only route)
router.post('/users', adminMiddleware, userController.createUser);

// Update a user (admin-only route)
router.put('/users/:id', adminMiddleware, userController.updateUser);

// Delete a user (admin-only route)
router.delete('/users/:id', adminMiddleware, userController.deleteUser);

// Get a user by ID (admin-only route)
router.get('/users/:id', adminMiddleware, userController.getUserById);

// Get all users (admin-only route)
router.get('/users', adminMiddleware, userController.getAllUsers);

module.exports = router;
