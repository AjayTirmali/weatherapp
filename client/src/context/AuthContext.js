import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// API URL configuration
const API_URL = process.env.REACT_APP_API_URL || '';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set up axios defaults on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  // Helper function to set auth token in axios headers
  const setAuthToken = (token) => {
    if (token) {
      // Set both auth headers for compatibility
      axios.defaults.headers.common['x-auth-token'] = token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          // Set token in headers
          setAuthToken(token);
          
          const res = await axios.get(`${API_URL}/api/users/profile`);
          if (res.data) {
            console.log('User profile loaded:', res.data);
            setUser(res.data);
            setIsAuthenticated(true);
          }
        }
      } catch (err) {
        console.error('Auth check error:', err.response?.data?.message || err.message);
        // If token is invalid, clear it
        localStorage.removeItem('token');
        setAuthToken(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  // Register user
  const register = async (formData) => {
    try {
      console.log('Registering with data:', formData);
      const res = await axios.post(`${API_URL}/api/users/register`, formData);
      
      if (res.data && res.data.token) {
        console.log('Registration successful');
        // Set token in localStorage
        localStorage.setItem('token', res.data.token);
        
        // Set token in headers
        setAuthToken(res.data.token);
        
        setUser(res.data.user);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        console.error('Registration failed: No token received');
        return { 
          success: false, 
          error: 'No authentication token received from server' 
        };
      }
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Registration failed: Server error' 
      };
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      console.log('Logging in with:', formData.email);
      const res = await axios.post(`${API_URL}/api/users/login`, formData);
      
      if (res.data && res.data.token) {
        console.log('Login successful');
        // Set token in localStorage
        localStorage.setItem('token', res.data.token);
        
        // Set token in headers
        setAuthToken(res.data.token);
        
        setUser(res.data.user);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        console.error('Login failed: No token received');
        return { 
          success: false, 
          error: 'No authentication token received from server' 
        };
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Login failed: Invalid credentials' 
      };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 