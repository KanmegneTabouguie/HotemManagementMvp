const db = require('../config/db');

class User {
    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE email = ?', [email], (error, results) => {
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
            db.query('INSERT INTO user (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, password, role], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.insertId); // Returning the ID of the newly inserted user
                }
            });
        });
    }

    static updateUser(userId, updatedUserData) {
        return new Promise((resolve, reject) => {
            // Construct the SQL query to update the user
            const query = `UPDATE user SET ? WHERE id=?`;

            // Execute the query
            db.query(query, [updatedUserData, userId], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static deleteUser(userId) {
        return new Promise((resolve, reject) => {
            // Construct the SQL query to delete the user
            const query = `DELETE FROM user WHERE id=?`;

            // Execute the query
            db.query(query, [userId], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getUserById(userId) {
        return new Promise((resolve, reject) => {
            // Construct the SQL query to get the user by ID
            const query = `SELECT * FROM user WHERE id=?`;

            // Execute the query
            db.query(query, [userId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]); // Assuming only one user will be found with the given ID
                }
            });
        });
    }

    static getAllUsers() {
        return new Promise((resolve, reject) => {
            // Construct the SQL query to get all users
            const query = `SELECT * FROM user`;

            // Execute the query
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = User;
