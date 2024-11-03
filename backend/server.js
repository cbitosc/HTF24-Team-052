const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Create uploads directory if it doesn't exist
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Connect to SQLite database
const db = new sqlite3.Database('wardrobe.db', (err) => {
  if (err) {
    console.error('Database error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create tables if they don't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    skin_tone TEXT,
    body_type TEXT,
    gender TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS clothing (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    file_path TEXT NOT NULL,
    item_type TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
});

// Endpoint to check if username exists
app.post('/api/check-username', (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ success: false, message: 'Username is required' });
  }
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    if (row) {
      return res.status(200).json({ success: false, message: 'Username already taken' });
    }
    return res.status(200).json({ success: true });
  });
});

// Endpoint to create a user profile with additional details
app.post('/api/profile', upload.array('clothing', 12), (req, res) => {
  console.log("Request body:", req.body); // Log the request body
  console.log("Uploaded files:", req.files); // Log the uploaded files
  
  const { username, skinTone, bodyType, gender } = req.body; // Updated from bodyShape to bodyType

  if (!username || !skinTone || !bodyType || !gender) {
    console.error("Validation failed:", { username, skinTone, bodyType, gender });
    return res.status(400).json({ error: 'All fields are required.' });
  }

  db.run(`INSERT INTO users (username, skin_tone, body_type, gender) VALUES (?, ?, ?, ?)`, 
    [username, skinTone, bodyType, gender], function(err) {
      if (err) {
        console.error('Error creating profile:', err.message);
        return res.status(500).json({ error: err.message });
      }

      const userId = this.lastID;

      if (req.files) {
        const clothingPromises = req.files.map(file => {
          return new Promise((resolve, reject) => {
            const itemType = file.originalname.split('.').pop(); 
            db.run(`INSERT INTO clothing (user_id, file_path, item_type) VALUES (?, ?, ?)`, 
              [userId, file.path, itemType], function(err) {
                if (err) {
                  console.error('Error uploading clothing:', err.message);
                  reject(err);
                } else {
                  resolve();
                }
              });
          });
        });

        Promise.all(clothingPromises)
          .then(() => {
            res.json({ success: true, message: 'Profile created successfully with clothing', userId });
          })
          .catch(err => {
            console.error('Error uploading clothing items:', err);
            res.status(500).json({ success: false, error: 'Error uploading clothing items' });
          });
      } else {
        res.json({ success: true, message: 'Profile created successfully without clothing', userId });
      }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
