const db = require('../config/db');

class Reservation {
    static createReservation(newReservation, callback) {
        const { user_id, room_id, check_in_date, check_out_date, total_amount } = newReservation;
        db.query('INSERT INTO Reservation (user_id, room_id, check_in_date, check_out_date, total_amount) VALUES (?, ?, ?, ?, ?)',
                 [user_id, room_id, check_in_date, check_out_date, total_amount], callback);
    }
}

module.exports = Reservation;




