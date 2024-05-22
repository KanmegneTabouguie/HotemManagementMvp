const db = require('../config/db');

class User {
    static findByEmail(email, callback) {
        db.query('SELECT * FROM User WHERE email = ?', [email], callback);
    }

    static createUser(newUser, callback) {
        const { username, email, password, role } = newUser;
        db.query('INSERT INTO User (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, password, role], callback);
    }
}

module.exports = User;
