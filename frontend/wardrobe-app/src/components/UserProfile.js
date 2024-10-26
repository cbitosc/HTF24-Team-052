// src/components/UserProfile.js
import React, { useState } from 'react';

function UserProfile() {
  const [gender, setGender] = useState('');
  const [skinColor, setSkinColor] = useState('');
  const [bodyType, setBodyType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your API to save user profile data
    console.log({ gender, skinColor, bodyType });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        placeholder="Gender"
        required
      />
      <input
        type="text"
        value={skinColor}
        onChange={(e) => setSkinColor(e.target.value)}
        placeholder="Skin Color"
        required
      />
      <input
        type="text"
        value={bodyType}
        onChange={(e) => setBodyType(e.target.value)}
        placeholder="Body Type"
        required
      />
      <button type="submit">Save Profile</button>
    </form>
  );
}

export default UserProfile;
