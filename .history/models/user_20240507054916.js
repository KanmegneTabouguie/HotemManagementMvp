const db = require('../config/db');

class User {
    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM User WHERE email = ?', [email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]); // Assuming email is unique, returning the first user found
                }
            });
        });
    }

    static createUser(newUser) {
        return new Promise((resolve, reject) => {
            const { username, email, password, role } = newUser;
            db.query('INSERT INTO User (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, password, role], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.insertId); // Returning the ID of the newly inserted user
                }
            });
        });
    }
}

module.exports = User;

