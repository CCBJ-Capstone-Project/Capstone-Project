import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/users">Users</Link>
      <Link to="/reviews">Reviews</Link>
      <Link to="/new-review-form">Create Review</Link>
      <SearchBar />
    </div>
  );
}
