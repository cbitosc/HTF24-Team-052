// backend/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new database file
const db = new sqlite3.Database(path.resolve(__dirname, 'wardrobe.db'), (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        gender TEXT,
        skin_color TEXT,
        body_type TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS clothing (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        type TEXT,
        color TEXT,
        style TEXT,
        image_url TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);
});

module.exports = db;
