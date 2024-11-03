import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsernamePage from './pages/UsernamePage';
import ProfilePage from './pages/ProfilePage';
import OccasionPage from './pages/OccasionPage';
import RecommendationPage from './pages/RecommendationPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UsernamePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/occasion" element={<OccasionPage />} />
          <Route path="/recommendation" element={<RecommendationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

