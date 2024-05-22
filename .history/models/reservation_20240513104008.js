// models/reservation.js
const db = require('../config/db');

class Reservation {
    static createReservation(newReservation, callback) {
        const { user_id, room_id, check_in_date, check_out_date, status, total_amount } = newReservation;
        db.query('INSERT INTO Reservation (user_id, room_id, check_in_date, check_out_date, status, total_amount) VALUES (?, ?, ?, ?, ?, ?)',
                 [user_id, room_id, check_in_date, check_out_date, status, total_amount], callback);
    }

    static updateReservation(reservationId, updatedReservation, callback) {
        const { user_id, room_id, check_in_date, check_out_date, status, total_amount } = updatedReservation;
        db.query('UPDATE Reservation SET user_id=?, room_id=?, check_in_date=?, check_out_date=?, status=?, total_amount=? WHERE id=?',
                 [user_id, room_id, check_in_date, check_out_date, status, total_amount, reservationId], callback);
    }

    static deleteReservation(reservationId, callback) {
        db.query('DELETE FROM Reservation WHERE id = ?', [reservationId], callback);
    }

    static getReservationById(reservationId, callback) {
        db.query('SELECT * FROM Reservation WHERE id = ?', [reservationId], callback);
    }

    static getAllReservations(callback) {
        db.query('SELECT * FROM Reservation', callback);
    }
}

module.exports = Reservation;
