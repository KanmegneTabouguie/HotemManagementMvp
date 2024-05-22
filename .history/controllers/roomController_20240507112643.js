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
    if (req.userType !== 'admin') {
        return res.status(403).json({ message: 'Only admins can create rooms' });
    }

    const { room_number, type, price_per_night, availability, image } = req.body;
    if (!room_number || !type || !price_per_night || !availability || !image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newRoomData = { room_number, type, price_per_night, availability, image };
        const result = await roomService.createRoom(newRoomData);
        res.status(201).json({ message: 'Room created successfully', roomId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
