import { useState, useEffect } from 'react';
import { searchReviews } from '../api/reviewsUtils';

function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (query) {
      const searchResults = await searchReviews(query);
      console.log(searchResults);
    }
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Search here"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
