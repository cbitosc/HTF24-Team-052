// src/components/UserCreation.js
import React, { useState } from 'react';
import { createUser } from '../api'; // Your API call function

function UserCreation() {
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await createUser({ username });
      console.log('User created:', newUser);
      // Redirect to profile page after user creation
      window.location.href = '/profile';
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <button type="submit">Create User</button>
    </form>
  );
}

export default UserCreation;
