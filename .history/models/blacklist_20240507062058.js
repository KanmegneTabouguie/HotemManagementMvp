const db = require('../config/db');

class Blacklist {
    static async addToken(token) {
        const expirationTime = new Date(Date.now() + 3600 * 1000); // 1 hour from now
        await db.query('INSERT INTO Blacklist (token, expirationTime) VALUES (?, ?)', [token, expirationTime]);
    }

    static async isTokenBlacklisted(token) {
        const [rows] = await db.query('SELECT COUNT(*) AS count FROM Blacklist WHERE token = ?', [token]);
        return rows[0].count > 0;
    }
}

module.exports = Blacklist;
