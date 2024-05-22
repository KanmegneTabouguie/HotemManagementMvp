// services/roomService.js
const Room = require('../models/Rooms');

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




};

module.exports = roomService;
