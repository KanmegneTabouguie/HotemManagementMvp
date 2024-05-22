// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const cacheMiddleware = require('../cache'); // Import the cache middleware

// List available rooms (accessible to both guests and admins)
router.get('/rooms', authMiddleware,cacheMiddleware(30), roomController.listAvailableRooms);

// Get room by ID (accessible to both guests and admins)
router.get('/rooms/:id', authMiddleware,cacheMiddleware(30), roomController.getRoomById);

// Create a new room (admin-only route)
router.post('/rooms', adminMiddleware, roomController.createRoom);


// Update a room (PUT)
router.put('/rooms/:id', adminMiddleware, roomController.updateRoom);

// Partially update a room (PATCH)
router.patch('/rooms/:id', adminMiddleware, roomController.partialUpdateRoom);

// Delete a room (admin-only route)
router.delete('/rooms/:id', adminMiddleware, roomController.deleteRoom);


module.exports = router;

