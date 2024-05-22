// models/room.js
const db = require('../config/db');

class Room {
    static getAllRooms(callback) {
        db.query('SELECT * FROM Room', callback);
    }

    static createRoom(newRoom, callback) {
        const { room_number, type, price_per_night, availability, image } = newRoom;
        db.query('INSERT INTO Room (room_number, type, price_per_night, availability, image) VALUES (?, ?, ?, ?, ?)', 
                 [room_number, type, price_per_night, availability, image], callback);
    }


    static getRoomById(roomId, callback) {
        db.query('SELECT * FROM Room WHERE id = ?', [roomId], callback);
    }

}

module.exports = Room;
