// routes/clothingRoutes.js
const express = require('express');
const router = express.Router();
const ClothingItem = require('../models/ClothingItem');
const multer = require('multer');
const path = require('path');

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Create a clothing item
router.post('/', upload.single('image'), async (req, res) => {
    const { type, color, style } = req.body;
    const image = req.file.path; // The path to the uploaded file

    try {
        const newItem = new ClothingItem({ image, type, color, style });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read all clothing items
router.get('/', async (req, res) => {
    try {
        const items = await ClothingItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a clothing item
router.put('/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { type, color, style } = req.body;
    const image = req.file ? req.file.path : undefined; // Optional: Update image only if a new one is provided

    try {
        const updatedItem = await ClothingItem.findByIdAndUpdate(id, { type, color, style, image }, { new: true });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a clothing item
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await ClothingItem.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
