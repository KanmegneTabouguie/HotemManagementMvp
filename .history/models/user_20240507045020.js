// models/user.js

const mysql = require('mysql');

// Create MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'your_mysql_user',
    password: 'your_mysql_password',
    database: 'your_database_name'
});

// User model methods
const User = {
    findByEmail: (email, callback) => {
        pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results[0]);
        });
    },

    createUser: (userData, callback) => {
        pool.query('INSERT INTO users SET ?', userData, (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results.insertId);
        });
    }
};

module.exports = User;
