import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecommendationPage() {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecommendations = localStorage.getItem('recommendations');
    if (storedRecommendations) {
      setRecommendations(JSON.parse(storedRecommendations));
    } else {
      // If no recommendations found, navigate back to the occasion page
      navigate('/occasion');
    }
  }, [navigate]);

  const handleBack = () => {
    navigate('/occasion');
  };

  return (
    <div>
      <h1>Recommended Outfits</h1>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((item, index) => (
            <li key={index}>
              <img src={item.file_path} alt={item.item_type} style={{ width: '100px', height: '100px' }} />
              <p>{item.item_type}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available.</p>
      )}
      <button onClick={handleBack}>Back to Occasion Selection</button>
    </div>
  );
}

export default RecommendationPage;
