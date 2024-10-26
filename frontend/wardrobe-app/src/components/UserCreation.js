import React, { useState } from 'react';
import { createUser } from '../api';

function UserCreation() {
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [skinColor, setSkinColor] = useState('');
  const [bodyType, setBodyType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, gender, skinColor, bodyType };

    try {
      const response = await createUser(userData);
      console.log('User created:', response.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" required />
      <input value={skinColor} onChange={(e) => setSkinColor(e.target.value)} placeholder="Skin Color" required />
      <input value={bodyType} onChange={(e) => setBodyType(e.target.value)} placeholder="Body Type" required />
      <button type="submit">Create User</button>
    </form>
  );
}

export default UserCreation;
