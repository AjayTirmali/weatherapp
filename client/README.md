# Weather Application - Client

This is the frontend React application for the Weather App, which allows users to search for weather information, register accounts, save favorite locations, and view search history.

## Features

- User registration and authentication
- Current weather display
- 5-day forecast
- Save favorite locations
- View search history
- Profile management

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```
4. Start the development server:
   ```
   npm start
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
4. Deploy the client app:
   ```
   vercel
   ```

### Environment Variables

When deploying to Vercel, set the following environment variable:

- `REACT_APP_API_URL` = URL of your deployed server (e.g., https://weather-app-server-tan.vercel.app)

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Application pages/routes
- `src/context/` - Context providers for state management
- `src/assets/` - Static assets like images and styles

## Additional Information

- The application uses React Router for navigation
- Authentication is handled with JWT tokens
- Weather data is fetched from the server API, which connects to OpenWeather API 