import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const authLinks = (
    <ul className="nav-links">
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <a href="#!" onClick={handleLogout}>Logout</a>
      </li>
      <li>
        <span style={{ color: '#3498db' }}>Welcome, {user && user.username}</span>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="nav-links">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <i className="fas fa-cloud-sun"></i> Weather App
      </Link>
      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

export default Navbar; 