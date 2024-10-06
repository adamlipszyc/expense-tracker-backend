const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');



db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS expenses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                category TEXT NOT NULL,
                amount REAL NOT NULL,
                date TEXT NOT NULL,
                description TEXT
            )
        `);
})

module.exports = db;
