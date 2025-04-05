import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';

// API URL configuration
const API_URL = process.env.REACT_APP_API_URL || '';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);

      // Get current weather
      const weatherResponse = await axios.get(
        `${API_URL}/api/weather/current?city=${city}`
      );

      // Get forecast
      const forecastResponse = await axios.get(
        `${API_URL}/api/weather/forecast?city=${city}`
      );

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || 
        'Error fetching weather data. Please try again.'
      );
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Check the Weather Anywhere
      </h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p style={{ textAlign: 'center' }}>Loading weather data...</p>}
      
      {error && (
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      )}

      {weather && <WeatherCard data={weather} />}

      {forecast && (
        <div className="forecast-container">
          <h2 className="forecast-title">5-Day Forecast</h2>
          <div className="forecast-cards">
            {forecast.list
              .filter((item, index) => index % 8 === 0) // Get one forecast per day (every 24h)
              .map((item, index) => (
                <ForecastCard key={index} data={item} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 