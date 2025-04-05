const axios = require('axios');
const WeatherLog = require('../models/WeatherLog');
require('dotenv').config();

// Use API key from environment variables
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Get current weather by city name
exports.getCurrentWeather = async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }
    
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric' // For Celsius
      }
    });
    
    // Log the search if user is logged in
    if (req.user) {
      await WeatherLog.create({
        userId: req.user._id,
        location: {
          city: response.data.name,
          country: response.data.sys.country
        }
      });
    }
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Weather API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      return res.status(404).json({ message: 'City not found' });
    }
    
    res.status(500).json({ message: 'Error fetching weather data' });
  }
};

// Get 5-day forecast by city name
exports.getForecast = async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }
    
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Forecast API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      return res.status(404).json({ message: 'City not found' });
    }
    
    res.status(500).json({ message: 'Error fetching forecast data' });
  }
};

// Get search history for a user
exports.getSearchHistory = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    const history = await WeatherLog.find({ userId: req.user._id })
      .sort({ searchedAt: -1 })
      .limit(10);
    
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ message: 'Error fetching search history' });
  }
}; 