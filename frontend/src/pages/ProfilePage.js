import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
  const [skinTone, setSkinTone] = useState('');
  const [bodyType, setBodyType] = useState(''); // Updated variable name to bodyType
  const [gender, setGender] = useState('');
  const [clothingItems, setClothingItems] = useState([{ name: '', file: null }]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleClothingChange = (index, event) => {
    const newClothingItems = [...clothingItems];
    newClothingItems[index][event.target.name] = event.target.value || event.target.files[0];
    setClothingItems(newClothingItems);
  };

  const addClothingItem = () => {
    setClothingItems([...clothingItems, { name: '', file: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem('username');

    if (!username || !skinTone || !bodyType || !gender) { // Updated from bodyShape to bodyType
      setError('Please fill all the required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('skinTone', skinTone);
    formData.append('bodyType', bodyType); // Updated from bodyShape to bodyType
    formData.append('gender', gender);

    clothingItems.forEach(item => {
      if (item.file) {
        formData.append('clothing', item.file);
      }
    });

    try {
      const response = await axios.post('http://localhost:5000/api/profile', formData);
      if (response.data.success) {
        setSuccess('Profile submitted successfully');
        setError('');
        navigate('/occasion');
      } else {
        setError(response.data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error uploading profile', error.response?.data || error.message);
      setError('Error uploading profile. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div>
      <h1>Profile Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Skin Tone:</label>
          <select value={skinTone} onChange={(e) => setSkinTone(e.target.value)} required>
            <option value="">Select Skin Tone</option>
            <option value="Light">Light</option>
            <option value="Medium">Medium</option>
            <option value="Dark">Dark</option>
            <option value="Olive">Olive</option>
            <option value="Fair">Fair</option>
          </select>
        </div>
        <div>
          <label>Body Type:</label>
          <select value={bodyType} onChange={(e) => setBodyType(e.target.value)} required>
            <option value="">Select Body Type</option>
            <option value="Pear">Pear</option>
            <option value="Apple">Apple</option>
            <option value="Rectangle">Rectangle</option>
            <option value="Hourglass">Hourglass</option>
            <option value="Inverted Triangle">Inverted Triangle</option>
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {clothingItems.map((item, index) => (
          <div key={index}>
            <label>Clothing Item {index + 1}:</label>
            <input
              type="text"
              name="name"
              value={item.name}
              onChange={(e) => handleClothingChange(index, e)}
              placeholder="Clothing Name"
              required
            />
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={(e) => handleClothingChange(index, e)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addClothingItem}>Add Another Clothing Item</button>
        <button type="submit">Submit Profile</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
}

export default ProfilePage;
