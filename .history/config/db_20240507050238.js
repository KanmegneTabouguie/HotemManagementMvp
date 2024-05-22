// config/db.js

const mysql = require('mysql');

// Create MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'yvan2021',
    database: 'hotelmanagement'
});

module.exports = pool;
