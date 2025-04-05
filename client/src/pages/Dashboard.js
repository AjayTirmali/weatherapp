import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';

// API URL configuration
const API_URL = process.env.REACT_APP_API_URL || '';

const Dashboard = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [searchHistory, setSearchHistory] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const loadFavoritesWeather = useCallback(async (favLocations) => {
    setLoadingData(true);
    const weatherPromises = favLocations.map(loc => 
      axios.get(`${API_URL}/api/weather/current?city=${loc.city}`)
        .then(res => ({ id: loc.city, data: res.data }))
        .catch(err => ({ id: loc.city, error: err.response?.data?.message || 'Error fetching weather' }))
    );
    
    const results = await Promise.all(weatherPromises);
    
    const weatherObj = {};
    results.forEach(result => {
      if (result.data) {
        weatherObj[result.id] = result.data;
      }
    });
    
    setWeatherData(weatherObj);
    setLoadingData(false);
  }, []);

  const fetchFavorites = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users/profile`);
      setFavorites(response.data.favorites || []);
      
      // Load weather data for favorites
      if (response.data.favorites && response.data.favorites.length > 0) {
        loadFavoritesWeather(response.data.favorites);
      }
    } catch (err) {
      console.error('Error fetching favorites:', err);
    }
  }, [loadFavoritesWeather]);

  const fetchSearchHistory = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/weather/history`);
      setSearchHistory(response.data || []);
    } catch (err) {
      console.error('Error fetching search history:', err);
    }
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  // Fetch user's favorites and search history
  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
      fetchSearchHistory();
    }
  }, [isAuthenticated, fetchFavorites, fetchSearchHistory]);

  const handleSearch = async (city) => {
    try {
      setLoadingData(true);
      setError(null);

      const response = await axios.get(
        `${API_URL}/api/weather/current?city=${city}`
      );

      // Add to favorites
      await addToFavorites(city, response.data.sys.country);
      
      // Refresh data
      fetchFavorites();
      fetchSearchHistory();
      
      setLoadingData(false);
    } catch (err) {
      setLoadingData(false);
      setError(
        err.response?.data?.message || 
        'Error fetching weather data. Please try again.'
      );
    }
  };

  const addToFavorites = async (city, country) => {
    try {
      await axios.post(`${API_URL}/api/users/favorites`, { city, country });
    } catch (err) {
      console.error('Error adding to favorites:', err);
    }
  };

  const removeFromFavorites = async (city) => {
    try {
      await axios.delete(`${API_URL}/api/users/favorites/${city}`);
      
      // Update state
      setFavorites(favorites.filter(fav => fav.city !== city));
      
      // Remove from weather data
      const newWeatherData = { ...weatherData };
      delete newWeatherData[city];
      setWeatherData(newWeatherData);
    } catch (err) {
      console.error('Error removing from favorites:', err);
    }
  };

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Your Weather Dashboard
      </h1>
      
      <SearchBar onSearch={handleSearch} />
      
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
      
      <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>Favorite Locations</h2>
      
      {loadingData && <p>Loading weather data...</p>}
      
      {favorites.length === 0 ? (
        <p>You haven't added any favorite locations yet.</p>
      ) : (
        <div className="dashboard-grid">
          {favorites.map((favorite) => (
            <div key={favorite.city} style={{ position: 'relative' }}>
              <button
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  zIndex: 1,
                  background: 'none',
                  border: 'none',
                  color: 'red',
                  fontSize: '18px',
                  cursor: 'pointer'
                }}
                onClick={() => removeFromFavorites(favorite.city)}
              >
                ×
              </button>
              
              {weatherData[favorite.city] ? (
                <WeatherCard data={weatherData[favorite.city]} />
              ) : (
                <div className="weather-card">
                  <h3>{favorite.city}</h3>
                  <p>Loading weather data...</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>Recent Searches</h2>
      
      {searchHistory.length === 0 ? (
        <p>No recent searches found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {searchHistory.map((search, index) => (
            <li 
              key={index}
              style={{ 
                padding: '10px',
                margin: '5px 0',
                background: '#f5f5f5',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>
                {search.location.city}, {search.location.country} - 
                {new Date(search.searchedAt).toLocaleString()}
              </span>
              <button
                style={{
                  background: '#3498db',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
                onClick={() => handleSearch(search.location.city)}
              >
                Search Again
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard; 