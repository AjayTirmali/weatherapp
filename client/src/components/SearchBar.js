import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const trimmedCity = city.trim();
    if (trimmedCity === '') {
      return;
    }
    
    setIsSearching(true);
    try {
      await onSearch(trimmedCity);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={isSearching}
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={isSearching || city.trim() === ''}
          style={{
            opacity: isSearching || city.trim() === '' ? 0.7 : 1,
            cursor: isSearching || city.trim() === '' ? 'not-allowed' : 'pointer'
          }}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar; 