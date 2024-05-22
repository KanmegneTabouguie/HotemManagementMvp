// controllers/roomController.js
const roomService = require('../services/roomService');

exports.listAvailableRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAllRooms();
        res.status(200).json({ rooms });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createRoom = async (req, res) => {
    if (req.userRole !== 'admin') {
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
        const userId = req.headers.userId;
        const userRole = req.headers.role;
        
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


