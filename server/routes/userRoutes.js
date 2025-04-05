const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Register new user
// Public route
router.post('/register', userController.register);

// Login user
// Public route
router.post('/login', userController.login);

// Get user profile
// Private route - requires authentication
router.get('/profile', auth, userController.getProfile);

// Add to favorites
// Private route
router.post('/favorites', auth, userController.addFavorite);

// Remove from favorites
// Private route
router.delete('/favorites/:city', auth, userController.removeFavorite);

module.exports = router; 