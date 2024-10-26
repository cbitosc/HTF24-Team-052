// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Link
import UserCreation from './components/UserCreation'; // Page 1: Unique Username Creation
import UserProfile from './components/UserProfile'; // Page 2: User's Physical Appearance
import ClothingUpload from './components/ClothingUpload'; // Page 3: Uploading Clothing Items

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav>
          <Link to="/">Create User</Link>
          <Link to="/profile">User Profile</Link>
          <Link to="/upload">Upload Clothing</Link>
        </nav>

        {/* Route Configuration */}
        <Routes>
          <Route path="/" element={<UserCreation />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/upload" element={<ClothingUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
