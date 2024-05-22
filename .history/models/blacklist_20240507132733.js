const db = require('../config/db');

class Blacklist {
    static async addToken(token) {
        const expirationTime = new Date(Date.now() + 3600 * 1000); // 1 hour from now
        await db.query('INSERT INTO Blacklist (token, expirationTime) VALUES (?, ?)', [token, expirationTime]);
    }

    static async isTokenBlacklisted(token) {
        try {
            const [rows] = await db.query('SELECT COUNT(*) AS count FROM Blacklist WHERE token = ?', [token]);
            console.log('Rows:', rows);
            return rows[0].count > 0;
        } catch (error) {
            console.error('Error in isTokenBlacklisted:', error);
            throw error;
        }
    }
}

module.exports = Blacklist;

