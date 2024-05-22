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
    }
};

module.exports = roomService;
