// models/user.js

const pool = require('../config/db');

const User = {
    create: async ({ username, email, password, role }) => {
        const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(query, [username, email, password, role]);
        return { id: result.insertId, username, email, role };
    },

    findOne: async (email) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await pool.query(query, [email]);
        return rows[0];
    }
};

module.exports = User;
