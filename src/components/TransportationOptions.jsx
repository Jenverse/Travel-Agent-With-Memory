import React from 'react';
import '../styles/TransportationOptions.css';

const TransportationOptions = ({ options }) => {
  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className="transportation-options">
      <h2>Transportation Options</h2>
      <div className="options-container">
        {options.map((option, index) => (
          <div key={index} className="transportation-card">
            <div className="transportation-type">
              <h3>{option.type}</h3>
              {option.recommended && <span className="recommended-badge">Recommended</span>}
            </div>
            <div className="transportation-details">
              <p><strong>Duration:</strong> {option.duration}</p>
              {option.cost && <p><strong>Estimated Cost:</strong> {option.cost}</p>}
              <p>{option.description}</p>
            </div>
            {option.notes && (
              <div className="transportation-notes">
                <p><em>{option.notes}</em></p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransportationOptions;
