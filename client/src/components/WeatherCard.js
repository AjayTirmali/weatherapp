import React from 'react';

const WeatherCard = ({ data }) => {
  if (!data) return null;

  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    wind: { speed },
    weather,
    sys: { country }
  } = data;

  const weatherIcon = weather[0].icon;
  const weatherDescription = weather[0].description;
  
  // Format weather description to capitalize first letter
  const formatDescription = (desc) => {
    return desc.charAt(0).toUpperCase() + desc.slice(1);
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2 className="location">
          {name}, {country}
        </h2>
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          alt={weatherDescription}
        />
      </div>
      
      <div className="temperature">{Math.round(temp)}°C</div>
      
      <p>{formatDescription(weatherDescription)}</p>
      
      <div className="weather-details">
        <div className="detail">
          <p className="detail-label">Feels Like</p>
          <p className="detail-value">{Math.round(feels_like)}°C</p>
        </div>
        
        <div className="detail">
          <p className="detail-label">Humidity</p>
          <p className="detail-value">{humidity}%</p>
        </div>
        
        <div className="detail">
          <p className="detail-label">Wind</p>
          <p className="detail-value">{speed} m/s</p>
        </div>
        
        <div className="detail">
          <p className="detail-label">Pressure</p>
          <p className="detail-value">{pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 