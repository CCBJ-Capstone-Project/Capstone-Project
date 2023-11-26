import { useState, useEffect } from 'react';
import { searchReviews } from '../api/reviewsUtils';
import { searchUsers } from '../api/usersUtils';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('reviews');

  const handleSearch = async () => {
    if (query) {
      try {
        let results = [];
        if (searchType === 'reviews') {
          results = await searchReviews(query);
        } else if (searchType === 'users') {
          results = await searchUsers(query);
        }
        // Add more conditions for other types (products, etc.)

        console.log(results);
        // Handle results accordingly
      } catch (error) {
        console.error('Error while searching:', error);
        setSearchResults([]);
      }
    }
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Search here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="reviews">Reviews</option>
        <option value="users">Users</option>
        {/* Add more options for other types */}
      </select>
      <button onClick={handleSearch}>Search</button>
      {/* Display search results */}
    </div>
  );
}
export default SearchBar;
