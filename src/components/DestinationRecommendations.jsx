import React from 'react';
import '../styles/DestinationRecommendations.css';

const DestinationRecommendations = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="destination-recommendations">
      <h2>Recommended Destinations</h2>
      <div className="recommendations-container">
        {recommendations.map((destination, index) => (
          <div key={index} className="destination-card">
            <h3>{destination.name}</h3>
            <p className="destination-type">{destination.type}</p>
            <p className="destination-description">{destination.description}</p>
            {destination.highlights && (
              <div className="destination-highlights">
                <h4>Highlights:</h4>
                <ul>
                  {destination.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationRecommendations;
