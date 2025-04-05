# Weather Application - MERN Stack

A full-stack weather application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **User Authentication**: Register, login, and manage your profile
- **Weather Search**: Get current weather and forecast for any city
- **Favorites**: Save your favorite locations for quick access
- **Search History**: View your recent weather searches
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **Frontend**: React, React Router, Axios, CSS3
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **External APIs**: OpenWeather API

## Getting Started

### Prerequisites

- Node.js installed (v14+ recommended)
- MongoDB Atlas account (connection string provided)
- OpenWeather API key (included in the project, but you should use your own for production)

### Installation

1. Clone the repository
```
git clone <repository-url>
cd weather-app
```

2. Install dependencies for the server and client
```
npm install
cd client
npm install
cd ..
```

3. Set up environment variables
   - The server uses a .env file with the following variables:
     - PORT
     - MONGO_URI
     - JWT_SECRET
     - OPENWEATHER_API_KEY

4. Run the application (development mode)
```
npm run dev
```
This will start both the backend server (on port 5000) and the React frontend (on port 3000).

## Folder Structure

```
weather-app/
  ├── client/                # React frontend
  │   ├── public/
  │   └── src/
  │       ├── components/    # Reusable components
  │       ├── context/       # Context providers
  │       ├── pages/         # Page components
  │       └── utils/         # Utility functions
  ├── server/                # Node.js backend
  │   ├── controllers/       # Route controllers
  │   ├── middleware/        # Custom middleware
  │   ├── models/            # MongoDB models
  │   ├── routes/            # API routes
  │   ├── .env               # Environment variables
  │   └── index.js           # Server entry point
  └── package.json           # Root package.json
```

## API Endpoints

### Weather Routes
- `GET /api/weather/current?city=<city>` - Get current weather for a city
- `GET /api/weather/forecast?city=<city>` - Get 5-day forecast for a city
- `GET /api/weather/history` - Get search history (requires authentication)

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/profile` - Get user profile (requires authentication)
- `POST /api/users/favorites` - Add location to favorites (requires authentication)
- `DELETE /api/users/favorites/:city` - Remove location from favorites (requires authentication)

## License

This project is licensed under the ISC License.

## Acknowledgments

- OpenWeather API for providing weather data
- MongoDB Atlas for database hosting 