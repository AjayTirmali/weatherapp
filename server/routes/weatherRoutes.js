const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const auth = require('../middleware/auth');

// Get current weather data
// Public route
router.get('/current', weatherController.getCurrentWeather);

// Get forecast data
// Public route
router.get('/forecast', weatherController.getForecast);

// Get search history
// Private route - requires authentication
router.get('/history', auth, weatherController.getSearchHistory);

module.exports = router; 