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

isRoomAvailable: async (roomId, checkInDate, checkOutDate) => {
    try {
        // Query the database to find reservations for the room within the date range
        const overlappingReservations = await Reservation.findOverlappingReservations(roomId, checkInDate, checkOutDate);

        // If there are no overlapping reservations, the room is available
        return overlappingReservations.length === 0;
    } catch (error) {
        console.error('Error checking room availability:', error);
        throw new Error('Error checking room availability');
    }
},

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
