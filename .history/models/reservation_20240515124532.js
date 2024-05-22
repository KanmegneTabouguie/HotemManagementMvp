// models/reservation.js
const db = require('../config/db');

class Reservation {
    static createReservation(newReservation, callback) {
        const { user_id, room_id, check_in_date, check_out_date, status, total_amount } = newReservation;
        db.query('INSERT INTO Reservation (user_id, room_id, check_in_date, check_out_date, status, total_amount) VALUES (?, ?, ?, ?, ?, ?)',
                 [user_id, room_id, check_in_date, check_out_date, status, total_amount], callback);
    }

    static findOverlappingReservations(roomId, checkInDate, checkOutDate, callback) {
        db.query('SELECT * FROM Reservation WHERE room_id = ? AND ((check_in_date BETWEEN ? AND ?) OR (check_out_date BETWEEN ? AND ?))', 
            [roomId, checkInDate, checkOutDate, checkInDate, checkOutDate], callback);
    }


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
    

}



module.exports = Reservation;

