// src/api.js

import axios from 'axios';

// Function to create a user
export const createUser = async (userData) => {
  const response = await axios.post('/api/users', userData);
  return response;
};

// Function to upload clothing (Add this function if missing)
export const uploadClothing = async (formData) => {
  const response = await axios.post('/api/clothing/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response;
};
