import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const nav = useNavigate();
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('reviews');

  const doSearch = async () => {
    if (query != '') {
      if (searchType === 'users') {
        nav('/usersearch?s=' + query);
        nav(0);
      } else if (searchType === 'reviews') {
        nav('/reviewsearch?s=' + query);
        nav(0);
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            doSearch();
          }
        }}
      />
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="reviews">Reviews</option>
        <option value="users">Users</option>
      </select>
      <button
        onClick={() => {
          doSearch();
        }}
      >
        Search
      </button>
    </div>
  );
}
export default SearchBar;
