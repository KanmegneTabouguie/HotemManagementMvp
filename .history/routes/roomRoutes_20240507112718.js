// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middleware/authMiddleware');

// List available rooms (accessible to both guests and admins)
router.get('/rooms', authMiddleware, roomController.listAvailableRooms);

// Create a new room (admin-only route)
router.post('/rooms', authMiddleware, roomController.createRoom);

module.exports = router;
