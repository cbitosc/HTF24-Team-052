import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css'; // Import the CSS file

function UsernamePage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim(); // Trim the username
    try {
        const response = await axios.post('http://localhost:5000/api/check-username', { username: trimmedUsername });
        if (response.data.success) {
            // Store the username in local storage
            localStorage.setItem('username', trimmedUsername);
            navigate('/profile');
        } else {
            setError(response.data.message);
        }
    } catch (err) {
        setError('An error occurred while checking the username.');
        console.error(err);
    }
  };

  return (
    <div>
      <h1>Create Your Username</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter a unique username"
          required
        />
        <button type="submit">Next</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default UsernamePage;
