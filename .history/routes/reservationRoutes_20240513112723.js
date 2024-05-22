const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Create a new reservation (accessible to both guests and admins)
router.post('/reservations', authMiddleware, reservationController.createReservation);

// Update a reservation (admin-only route)
router.put('/reservations/:id', adminMiddleware, reservationController.updateReservation);

// Partially update a reservation (admin-only route)
router.patch('/reservations/:id', adminMiddleware, reservationController.updateReservationPartially);

// Delete a reservation (admin-only route)
router.delete('/reservations/:id', adminMiddleware, reservationController.deleteReservation);

// Get all reservations (admin-only route)
router.get('/reservations', adminMiddleware, reservationController.getAllReservations);

// Get reservations by user ID (accessible to both guests and admins)
router.get('/reservations/user/:userId', authMiddleware, reservationController.getReservationsByUserId);

// Get reservation by ID (admin-only route)
router.get('/reservations/:id', adminMiddleware, reservationController.getReservationById);

module.exports = router;
