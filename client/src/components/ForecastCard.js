import React from 'react';

const ForecastCard = ({ data }) => {
  if (!data) return null;

  // Extract date and convert to readable format
  const date = new Date(data.dt * 1000);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
  
  // Time formatted
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Extract weather icon and description
  const { icon, description } = data.weather[0];
  const formattedDescription = description.charAt(0).toUpperCase() + description.slice(1);

  return (
    <div className="forecast-card">
      <p className="forecast-date">{formattedDate}</p>
      <p>{formattedTime}</p>
      <img
        className="forecast-icon"
        src={`http://openweathermap.org/img/wn/${icon}.png`}
        alt={description}
      />
      <p className="forecast-temp">{Math.round(data.main.temp)}°C</p>
      <p className="forecast-description">{formattedDescription}</p>
    </div>
  );
};

export default ForecastCard; 