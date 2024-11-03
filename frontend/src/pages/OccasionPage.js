import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OccasionPage() {
  const [occasion, setOccasion] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem('username');

    if (!occasion) {
      setError('Please select an occasion.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/recommendation', { username, occasion });
      if (response.data.success) {
        // Store the recommendations in local storage or state
        localStorage.setItem('recommendations', JSON.stringify(response.data.recommendations));
        navigate('/recommendations');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Error fetching recommendations', err);
      setError('An error occurred while fetching recommendations.');
    }
  };

  return (
    <div>
      <h1>Select Occasion</h1>
      <form onSubmit={handleSubmit}>
        <select value={occasion} onChange={(e) => setOccasion(e.target.value)} required>
          <option value="">Select an occasion</option>
          <option value="Casual">Casual</option>
          <option value="Formal">Formal</option>
          <option value="Party">Party</option>
          <option value="Workout">Workout</option>
        </select>
        <button type="submit">Get Recommendations</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default OccasionPage;
