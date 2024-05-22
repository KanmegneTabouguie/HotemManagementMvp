const reservationService = require('../services/reservationService');
const roomController = require('../controllers/roomController'); // Import room controller

exports.createReservation = async (req, res) => {
    try {
        const { user_id, room_id, check_in_date, check_out_date } = req.body;

        // Check if the room exists
        const room = await roomController.getRoomById(req, res); // Use room controller method
        if (res.statusCode !== 200) {
            // If room is not found, return the response from the room controller
            return;
        }

        // Calculate total amount based on price per night and duration of stay
        const pricePerNight = room.room.price_per_night;
        const diffTime = Math.abs(new Date(check_out_date) - new Date(check_in_date));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const total_amount = diffDays * pricePerNight;

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
