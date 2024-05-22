const db = require('../config/db');

class User {
    static findByEmail(email, callback) {
        db.query('SELECT * FROM User WHERE email = ?', [email], callback);
    }

    static createUser(newUser, callback) {
        db.query('INSERT INTO User SET ?', newUser, callback);
    }
}

module.exports = User;
