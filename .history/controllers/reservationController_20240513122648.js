const reservationService = require('../services/reservationService');
const Room = require('../models/room');

const reservationController = {
    createReservation: async (req, res) => {
        try {
            const userRole = req.headers['x-userrole']; // Get user role from request headers
    
            if (userRole !== 'admin' && userRole !== 'guest') {
                return res.status(403).json({ message: 'Access forbidden. User role must be either guest or admin' });
            }
    
            const { user_id, room_id, check_in_date, check_out_date } = req.body;
            if (!user_id || !room_id || !check_in_date || !check_out_date) {
                return res.status(400).json({ message: 'All fields are required' });
            }
    
            // Fetch room details based on room_id
            const room = await Room.getRoomById(room_id);
            if (!room) {
                return res.status(404).json({ message: 'Room not found' });
            }
    
            // Calculate total amount based on check-in and check-out dates and room price per night
            const pricePerNight = room.price_per_night;
            const startDate = new Date(check_in_date);
            const endDate = new Date(check_out_date);
            const numberOfNights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            const total_amount = numberOfNights * pricePerNight;
    
            const newReservationData = { user_id, room_id, check_in_date, check_out_date, total_amount };
            const result = await reservationService.createReservation(newReservationData);
            res.status(201).json({ message: 'Reservation created successfully', reservationId: result.insertId });
        } catch (error) {
            console.error('Error creating reservation:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    
    

    updateReservation: async (req, res) => {
        try {
            const userRole = req.headers['x-userrole']; // Get user role from request headers

            // Check if the user is an admin
            if (userRole !== 'admin') {
                return res.status(403).json({ message: 'Access forbidden. Only admin users can update reservations' });
            }

            const reservationId = req.params.id;
            const updatedReservationData = req.body;
            await reservationService.updateReservation(reservationId, updatedReservationData);
            res.status(200).json({ message: 'Reservation updated successfully' });
        } catch (error) {
            console.error('Error updating reservation:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

// Partially update a reservation (admin-only route)
updateReservationPartially: async (req, res) => {
    try {
        const userRole = req.headers['x-userrole']; // Get user role from request headers

        // Check if the user is an admin
        if (userRole !== 'admin') {
            return res.status(403).json({ message: 'Access forbidden. Only admin users can update reservations' });
        }

        const reservationId = req.params.id;
        const updatedFields = req.body; // Contains only the fields to be updated
        await reservationService.partiallyUpdateReservation(reservationId, updatedFields);
        res.status(200).json({ message: 'Reservation updated successfully' });
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
},



    deleteReservation: async (req, res) => {
        try {
            const userRole = req.headers['x-userrole']; // Get user role from request headers

            // Check if the user is an admin
            if (userRole !== 'admin') {
                return res.status(403).json({ message: 'Access forbidden. Only admin users can delete reservations' });
            }

            const reservationId = req.params.id;
            await reservationService.deleteReservation(reservationId);
            res.status(200).json({ message: 'Reservation deleted successfully' });
        } catch (error) {
            console.error('Error deleting reservation:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getAllReservations: async (req, res) => {
        try {
            const userRole = req.headers['x-userrole']; // Get user role from request headers

            // Check if the user is an admin
            if (userRole !== 'admin') {
                return res.status(403).json({ message: 'Access forbidden. Only admin users can access all reservations' });
            }

            const reservations = await reservationService.getAllReservations();
            res.status(200).json({ reservations });
        } catch (error) {
            console.error('Error fetching reservations:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getReservationById: async (req, res) => {
        try {
            const userRole = req.headers['x-userrole']; // Get user role from request headers

            // Check if the user is an admin
            if (userRole !== 'admin') {
                return res.status(403).json({ message: 'Access forbidden. Only admin users can access reservations by ID' });
            }

            const reservationId = req.params.id;
            const reservation = await reservationService.getReservationById(reservationId);
            if (!reservation) {
                return res.status(404).json({ message: 'Reservation not found' });
            }
            res.status(200).json({ reservation });
        } catch (error) {
            console.error('Error fetching reservation by ID:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getReservationsByUserId: async (req, res) => {
        try {
            const userRole = req.headers['x-userrole']; // Get user role from request headers
    
            // Check if the user role is either admin or guest
            if (userRole !== 'admin' && userRole !== 'guest') {
                return res.status(403).json({ message: 'Access forbidden. User role must be either guest or admin' });
            }
    
            const userId = req.params.userId; // Assuming the user ID is passed as a parameter
            const reservations = await reservationService.getReservationsByUserId(userId);
            res.status(200).json({ reservations });
        } catch (error) {
            console.error('Error fetching reservations by user ID:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    


};

module.exports = reservationController;
