// src/components/ClothingUpload.js
import React, { useState } from 'react';
import { createUser, uploadClothing } from '../api';

function ClothingUpload() {
  // States for clothing item
  const [image, setImage] = useState(null);
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('');

  // States for user profile
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [skinColor, setSkinColor] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [isSkinToneModalOpen, setIsSkinToneModalOpen] = useState(false);
  const [isBodyTypeModalOpen, setIsBodyTypeModalOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file); // Set the image file
    } else {
      console.error("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle user profile creation
    const userData = {
      username,
      gender,
      skin_color: skinColor,
      body_type: bodyType,
    };

    try {
      // Create user
      const newUser = await createUser(userData);
      console.log('User created:', newUser);

      // Prepare clothing data
      const formData = new FormData();
      formData.append('image', image);
      formData.append('type', type);
      formData.append('color', color);
      formData.append('style', style);

      // Upload clothing item
      const clothingResponse = await uploadClothing(formData);
      console.log('Clothing uploaded:', clothingResponse.data);

      // Reset form fields after submission
      resetForm();
    } catch (error) {
      console.error("Error creating user or uploading clothing:", error);
    }
  };

  const resetForm = () => {
    setImage(null);
    setType('');
    setColor('');
    setStyle('');
    setUsername('');
    setGender('');
    setSkinColor('');
    setBodyType('');
  };

  const skinToneOptions = [
    { value: 'light', name: 'Light - Fair' },
    { value: 'medium-light', name: 'Medium Light - Wheatish' },
    { value: 'medium', name: 'Medium - Olive' },
    { value: 'medium-tan', name: 'Medium Tan - Honey' },
    { value: 'tan', name: 'Tan - Caramel' },
    { value: 'dark', name: 'Dark - Deep Brown' },
    { value: 'very-dark', name: 'Very Dark - Ebony' },
  ];

  const bodyTypeOptions = [
    { value: 'slim', name: 'Slim' },
    { value: 'average', name: 'Average' },
    { value: 'athletic', name: 'Athletic' },
    { value: 'curvy', name: 'Curvy' },
    { value: 'plus-size', name: 'Plus Size' },
  ];

  return (
    <div>
      <h2>Upload Clothing Item and Create User</h2>
      <form onSubmit={handleSubmit}>
        {/* User Profile Fields */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
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
          onClick={() => setIsSkinToneModalOpen(true)}
          placeholder="Skin Color"
          readOnly
          required
        />
        <input
          type="text"
          value={bodyType}
          onClick={() => setIsBodyTypeModalOpen(true)}
          placeholder="Body Type"
          readOnly
          required
        />

        {/* Clothing Upload Fields */}
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <input
          type="text"
          placeholder="Type (e.g., Shirt, Pants)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          required
        />

        <button type="submit">Add Item and Create User</button>
      </form>

      {image && <img src={URL.createObjectURL(image)} alt="Clothing Item" style={{ width: '200px' }} />}

      {/* Modal for skin tone selection */}
      {isSkinToneModalOpen && (
        <div className="modal">
          <h3>Select Skin Tone</h3>
          <ul>
            {skinToneOptions.map(tone => (
              <li key={tone.value} onClick={() => { setSkinColor(tone.name); setIsSkinToneModalOpen(false); }}>
                {tone.name}
              </li>
            ))}
          </ul>
          <button onClick={() => setIsSkinToneModalOpen(false)}>Close</button>
        </div>
      )}

      {/* Modal for body type selection */}
      {isBodyTypeModalOpen && (
        <div className="modal">
          <h3>Select Body Type</h3>
          <ul>
            {bodyTypeOptions.map(type => (
              <li key={type.value} onClick={() => { setBodyType(type.name); setIsBodyTypeModalOpen(false); }}>
                {type.name}
              </li>
            ))}
          </ul>
          <button onClick={() => setIsBodyTypeModalOpen(false)}>Close</button>
        </div>
      )}

      <style jsx>{`
        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }
        .modal ul {
          list-style: none;
          padding: 0;
        }
        .modal li {
          cursor: pointer;
          padding: 5px;
        }
        .modal li:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
}

export default ClothingUpload;
