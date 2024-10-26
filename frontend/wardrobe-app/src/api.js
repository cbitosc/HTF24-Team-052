// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update this if your backend is hosted elsewhere

// Function to create a user
export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

// Add more functions for other API endpoints as needed
