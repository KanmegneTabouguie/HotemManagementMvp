const Reservation = require('../models/Reservation');

const reservationService = {
    createReservation: (newReservationData) => {
        return new Promise((resolve, reject) => {
            Reservation.createReservation(newReservationData, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
};

module.exports = reservationService;
