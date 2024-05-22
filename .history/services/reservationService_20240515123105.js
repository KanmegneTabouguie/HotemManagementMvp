// services/reservationService.js
const Reservation = require('../models/reservation');

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
