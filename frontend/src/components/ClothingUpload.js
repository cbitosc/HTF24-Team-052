// src/ClothingUpload.js
import React, { useState } from 'react';

const ClothingUpload = () => {
    const [clothingFiles, setClothingFiles] = useState([]);

    const handleClothingChange = (event) => {
        const files = event.target?.files; // Using optional chaining for safety
        console.log('Files:', files);
        
        if (files && files.length > 0) {
            setClothingFiles([...clothingFiles, ...files]); // Update state with new files
        } else {
            console.error('No files selected or files is null');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleClothingChange} multiple />
            <ul>
                {clothingFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ClothingUpload;
