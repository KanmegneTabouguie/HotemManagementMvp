//controllers/roomController.js
const roomService = require('../services/roomService');
const cache = require('memory-cache');

// Set cache duration in milliseconds
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
exports.listAvailableRooms = async (req, res) => {
    try {
        const userRole = req.headers['x-userrole']; // Changed to lowercase
        
        if (userRole !== 'admin' && userRole !== 'guest') {
            return res.status(403).json({ message: 'Access forbidden. User role must be either guest or admin' });
        }

        const rooms = await roomService.getAllRooms();
        res.status(200).json({ rooms });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.createRoom = async (req, res) => {
    const userRole = req.headers['x-userrole'];

    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Only admins can create rooms' });
    }

    try {
        const { room_number, type, price_per_night, availability, image } = req.body;
        if (!room_number || !type || !price_per_night || !availability || !image) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newRoomData = { room_number, type, price_per_night, availability, image };
        const result = await roomService.createRoom(newRoomData);
        res.status(201).json({ message: 'Room created successfully', roomId: result.insertId });
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getRoomById = async (req, res) => {
    try {
        const userRole = req.headers['x-userrole']; // Corrected to use 'x-userrole'
        
        if (userRole !== 'admin' && userRole !== 'guest') {
            return res.status(403).json({ message: 'Access forbidden. User role must be either guest or admin' });
        }

        const roomId = req.params.id;
        const room = await roomService.getRoomById(roomId);
        
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        
        res.status(200).json({ room });
    } catch (error) {
        console.error('Error fetching room by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Function to update a room (PUT method)
exports.updateRoom = async (req, res) => {
    try {
        const userRole = req.headers['x-userrole']; // Corrected to use 'x-userrole'
        if (userRole !== 'admin') {
            return res.status(403).json({ message: 'Only admins can update rooms' });
        }

        const roomId = req.params.id;
        const { room_number, type, price_per_night, availability, image } = req.body;

        // Check if all required fields are provided
        if (!room_number || !type || !price_per_night || !availability || !image) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create an object with updated room data
        const updatedRoom = { room_number, type, price_per_night, availability, image };

        // Call the roomService method to update the room
        await roomService.updateRoom(roomId, updatedRoom);

        res.status(200).json({ message: 'Room updated successfully' });
    } catch (error) {
        console.error('Error updating room:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to partially update a room (PATCH method)
exports.partialUpdateRoom = async (req, res) => {
    try {
        const userRole = req.headers['x-userrole']; // Corrected to use 'x-userrole'
        if (userRole !== 'admin') {
            return res.status(403).json({ message: 'Only admins can update rooms' });
        }

        const roomId = req.params.id;
        const updatedFields = req.body;

        // Call the roomService method to partially update the room
        await roomService.partialUpdateRoom(roomId, updatedFields);

        res.status(200).json({ message: 'Room updated successfully' });
    } catch (error) {
        console.error('Error updating room:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to delete a room
exports.deleteRoom = async (req, res) => {
    try {
        const userRole = req.headers['x-userrole']; // Corrected to use 'x-userrole'
        if (userRole !== 'admin') {
            return res.status(403).json({ message: 'Only admins can delete rooms' });
        }

        const roomId = req.params.id;

        // Delete the room from the database
        await roomService.deleteRoom(roomId);

        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error('Error deleting room:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};