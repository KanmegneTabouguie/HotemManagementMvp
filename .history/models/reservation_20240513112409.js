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

    static partiallyUpdateReservation(reservationId, updatedFields, callback) {
        // Construct the SQL query to update specific fields of the reservation
        const query = `UPDATE Reservation SET ? WHERE id=?`;
    
        // Execute the query
        db.query(query, [updatedFields, reservationId], callback);
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

    static getReservationsByUserId(userId, callback) {
        db.query('SELECT * FROM Reservation WHERE user_id = ?', [userId], callback);
    }
}

module.exports = Reservation;

