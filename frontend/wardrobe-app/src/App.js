import React from 'react';
import ClothingUpload from './components/ClothingUpload';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Wardrobe App!</h1>
      <p>Your digital clothing inventory.</p>
      <ClothingUpload />
    </div>
  );
}

export default App;
