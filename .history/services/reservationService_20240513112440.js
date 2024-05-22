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
    },

    updateReservation: (reservationId, updatedReservationData) => {
        return new Promise((resolve, reject) => {
            Reservation.updateReservation(reservationId, updatedReservationData, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    },


// Method to partially update a reservation
partiallyUpdateReservation: (reservationId, updatedFields) => {
    return new Promise((resolve, reject) => {
        Reservation.partiallyUpdateReservation(reservationId, updatedFields, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
},



    deleteReservation: (reservationId) => {
        return new Promise((resolve, reject) => {
            Reservation.deleteReservation(reservationId, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    },

    getReservationById: (reservationId) => {
        return new Promise((resolve, reject) => {
            Reservation.getReservationById(reservationId, (err, reservation) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(reservation);
            });
        });
    },

    getAllReservations: () => {
        return new Promise((resolve, reject) => {
            Reservation.getAllReservations((err, reservations) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(reservations);
            });
        });
    },
    
    getReservationsByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            Reservation.getReservationsByUserId(userId, (err, reservations) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(reservations);
            });
        });
    }
};

module.exports = reservationService;
