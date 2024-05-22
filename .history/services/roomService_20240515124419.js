// services/roomService.js
const Room = require('../models/room');
const Reservation = require('../models/reservation');

const roomService = {
    getAllRooms: () => {
        return new Promise((resolve, reject) => {
            Room.getAllRooms((err, rooms) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rooms);
            });
        });
    },

    createRoom: (newRoomData) => {
        return new Promise((resolve, reject) => {
            Room.createRoom(newRoomData, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    },

    getRoomById: (roomId) => {
        return new Promise((resolve, reject) => {
            Room.getRoomById(roomId, (err, room) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(room);
            });
        });
    },

       // Method to update a room
       updateRoom: async (roomId, updatedRoomData) => {
        return new Promise((resolve, reject) => {
            // Update the room in the database
            Room.updateRoom(roomId, updatedRoomData, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    },
 // Method to partially update a room
 partialUpdateRoom: async (roomId, updatedFields) => {
    return new Promise((resolve, reject) => {
        // Update the room in the database
        Room.partialUpdateRoom(roomId, updatedFields, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
},

   // Method to delete a room
   deleteRoom: async (roomId) => {
    return new Promise((resolve, reject) => {
        // Delete the room from the database
        Room.deleteRoom(roomId, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
},

static isRoomAvailable(roomId, checkInDate, checkOutDate) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Reservation WHERE room_id = ? AND ((check_in_date BETWEEN ? AND ?) OR (check_out_date BETWEEN ? AND ?))',
            [roomId, checkInDate, checkOutDate, checkInDate, checkOutDate], (err, reservations) => {
                if (err) {
                    reject(err);
                    return;
                }
                // Check if reservations array is defined and has length > 0
                if (reservations && reservations.length > 0) {
                    resolve(false); // Room not available
                } else {
                    resolve(true); // Room available
                }
            });
    });
}
,

calculateTotalAmount: async (roomId, checkInDate, checkOutDate) => {
    try {
        // Fetch the price per night from the room details in the database
        const room = await Room.getRoomById(roomId);
        const pricePerNight = room.price_per_night;

        // Calculate the duration of stay in days
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const durationInDays = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

        // Calculate the total amount
        const totalAmount = pricePerNight * durationInDays;

        return totalAmount;
    } catch (error) {
        console.error('Error calculating total amount:', error);
        throw new Error('Error calculating total amount');
    }
}


};

module.exports = roomService;
