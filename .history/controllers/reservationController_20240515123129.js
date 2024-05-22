// controllers/reservationController.js
const reservationService = require('../services/reservationService');

exports.createReservation = async (req, res) => {
    try {
        const { user_id, room_id, check_in_date, check_out_date, status, total_amount } = req.body;

        // Add business logic here to check room availability and calculate total amount

        const newReservationData = { user_id, room_id, check_in_date, check_out_date, status, total_amount };
        const result = await reservationService.createReservation(newReservationData);
        res.status(201).json({ message: 'Reservation created successfully', reservationId: result.insertId });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
