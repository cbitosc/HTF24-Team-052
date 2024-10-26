import React, { useState } from 'react';

function ClothingUpload() {
  const [image, setImage] = useState(null);
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('');

  const handleFileChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ image, type, color, style });
  };

  return (
    <div>
      <h2>Upload Clothing Item</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="Type (e.g., Shirt, Pants)"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>
      {image && <img src={image} alt="Clothing Item" style={{ width: '200px' }} />}
    </div>
  );
}

export default ClothingUpload;
