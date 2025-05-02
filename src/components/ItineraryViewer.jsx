import React from 'react';
import '../styles/ItineraryViewer.css';

const ItineraryViewer = ({ itinerary }) => {
  if (!itinerary || !itinerary.days || itinerary.days.length === 0) {
    return null;
  }

  return (
    <div className="itinerary-viewer">
      <h2>Your Itinerary for {itinerary.destination}</h2>
      <div className="itinerary-details">
        <p><strong>Duration:</strong> {itinerary.days.length} days</p>
        {itinerary.travelDates && (
          <p><strong>Travel Dates:</strong> {itinerary.travelDates}</p>
        )}
      </div>
      <div className="itinerary-days">
        {itinerary.days.map((day, index) => (
          <div key={index} className="itinerary-day">
            <h3>Day {index + 1}</h3>
            <div className="day-activities">
              {day.activities.map((activity, idx) => (
                <div key={idx} className="activity">
                  <div className="activity-time">{activity.time}</div>
                  <div className="activity-details">
                    <h4>{activity.name}</h4>
                    <p>{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryViewer;
