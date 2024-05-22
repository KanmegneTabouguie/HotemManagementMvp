// controllers/reservationController.js
const reservationService = require('../services/reservationService');
const roomService = require('../services/roomService');

exports.createReservation = async (req, res) => {
    try {
        const { user_id, room_id, check_in_date, check_out_date } = req.body;

        // Check if the room is available for the specified dates
        const isRoomAvailable = await roomService.isRoomAvailable(room_id, check_in_date, check_out_date);
        if (!isRoomAvailable) {
            return res.status(400).json({ message: 'Room is not available for the specified dates' });
        }

        // Calculate total amount based on price per night and duration of stay
        const total_amount = await roomService.calculateTotalAmount(room_id, check_in_date, check_out_date);

        // Set default status to "pending"
        const status = 'pending';

        // Create the reservation
        const newReservationData = { user_id, room_id, check_in_date, check_out_date, status, total_amount };
        const result = await reservationService.createReservation(newReservationData);

        res.status(201).json({ message: 'Reservation created successfully', reservationId: result.insertId });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
