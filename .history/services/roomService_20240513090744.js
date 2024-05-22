// services/roomService.js
const Room = require('../models/room');

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


};

module.exports = roomService;
