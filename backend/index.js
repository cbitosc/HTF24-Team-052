const express = require('express'); // Import Express
const sqlite3 = require('sqlite3').verbose(); // Import SQLite3
const bodyParser = require('body-parser'); // Import Body Parser
const cors = require('cors'); // Import CORS

const app = express(); // Create an Express application
const PORT = 5000; // Define the port

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to SQLite database
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Could not connect to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Define a simple route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Wardrobe Assistant API!'); // Response message
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Server running message
});
const cors = require('cors');

app.use(cors()); // Enable CORS
