import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

// API URL configuration
const API_URL = process.env.REACT_APP_API_URL || '';

const Profile = () => {
  const { user, isAuthenticated, loading, logout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !isAuthenticated) {
      navigate('/login');
      return;
    }

    // Fetch user profile data
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/api/users/profile`);
        setProfileData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data. Please try again.');
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProfileData();
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading || isLoading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>User Profile</h1>
      
      {profileData && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h2>Account Information</h2>
            <p><strong>Username:</strong> {profileData.username}</p>
            <p><strong>Email:</strong> {profileData.email}</p>
            <p><strong>Account Created:</strong> {new Date(profileData.createdAt).toLocaleDateString()}</p>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h2>Favorite Locations</h2>
            {profileData.favorites && profileData.favorites.length > 0 ? (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {profileData.favorites.map((favorite, index) => (
                  <li key={index} style={{ 
                    padding: '10px', 
                    margin: '5px 0', 
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    {favorite.city}, {favorite.country}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No favorite locations saved yet.</p>
            )}
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h2>Search History</h2>
            {profileData.searchHistory && profileData.searchHistory.length > 0 ? (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {profileData.searchHistory.slice(0, 10).map((search, index) => (
                  <li key={index} style={{ 
                    padding: '10px', 
                    margin: '5px 0', 
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <p><strong>Location:</strong> {search.location.city}, {search.location.country}</p>
                    <p><strong>Searched:</strong> {new Date(search.searchedAt).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No search history available.</p>
            )}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button 
              onClick={handleLogout}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 