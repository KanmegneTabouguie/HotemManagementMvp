const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Define routes for reservations
router.post('/', reservationController.createReservation);
router.put('/:id', reservationController.updateReservation);
router.delete('/:id', reservationController.deleteReservation);
router.get('/:id', reservationController.getReservationById);
router.get('/', reservationController.getAllReservations);

module.exports = router;
