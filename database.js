const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});



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
