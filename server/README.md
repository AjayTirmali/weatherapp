# Weather Application - Server

This is the backend server for the Weather App, which provides API endpoints for weather data retrieval, user authentication, and data storage.

## Features

- User authentication (registration, login)
- Weather data retrieval via OpenWeather API
- Favorite locations management
- Search history tracking
- User profile management

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   OPENWEATHER_API_KEY=your_openweather_api_key
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Production Deployment on Vercel

This application is configured for deployment on Vercel.

### Deployment Steps:

1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI:
   ```
   npm i -g vercel
   ```
3. Login to Vercel:
   ```
   vercel login
   ```
4. Deploy the server app:
   ```
   vercel
   ```

### Environment Variables

When deploying to Vercel, set the following environment variables:

- `PORT` = 5000
- `MONGO_URI` = Your MongoDB connection string
- `JWT_SECRET` = Your JWT secret key for token generation
- `OPENWEATHER_API_KEY` = Your OpenWeather API key

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (authenticated)
- `POST /api/users/favorites` - Add location to favorites (authenticated)
- `DELETE /api/users/favorites/:city` - Remove location from favorites (authenticated)

### Weather Routes
- `GET /api/weather/current?city={city}` - Get current weather for a city
- `GET /api/weather/forecast?city={city}` - Get 5-day forecast for a city
- `GET /api/weather/history` - Get user's search history (authenticated)

## Project Structure

- `controllers/` - Route handler functions
- `middleware/` - Authentication and validation middleware
- `models/` - MongoDB schema definitions
- `routes/` - API route definitions
- `index.js` - Main application file 