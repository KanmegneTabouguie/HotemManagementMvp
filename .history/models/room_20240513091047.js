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


     // Method to update a room (PUT)
     static updateRoom(roomId, updatedRoom, callback) {
        // Construct the SQL query to update the room
        const query = `UPDATE Room SET room_number=?, type=?, price_per_night=?, availability=?, image=? WHERE id=?`;
        const { room_number, type, price_per_night, availability, image } = updatedRoom;

        // Execute the query
        db.query(query, [room_number, type, price_per_night, availability, image, roomId], callback);
    }

    // Method to partially update a room (PATCH)
    static partialUpdateRoom(roomId, updatedFields, callback) {
        // Construct the SQL query to update specific fields of the room
        const query = `UPDATE Room SET ? WHERE id=?`;

        // Execute the query
        db.query(query, [updatedFields, roomId], callback);
    }

}

module.exports = Room;
