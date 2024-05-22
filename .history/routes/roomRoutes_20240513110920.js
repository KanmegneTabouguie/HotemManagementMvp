const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Create reservation (accessible to both guests and admins)
router.post('/reservations', authMiddleware, reservationController.createReservation);

// Update reservation (admin-only route)
router.put('/reservations/:id', adminMiddleware, reservationController.updateReservation);

// Delete reservation (admin-only route)
router.delete('/reservations/:id', adminMiddleware, reservationController.deleteReservation);

// Get reservation by ID (accessible to both guests and admins)
router.get('/reservations/:id', authMiddleware, reservationController.getReservationById);

// Get all reservations (admin-only route)
router.get('/reservations', adminMiddleware, reservationController.getAllReservations);

module.exports = router;


