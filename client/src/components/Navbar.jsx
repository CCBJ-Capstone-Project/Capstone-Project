import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Navbar() {
  const nav = useNavigate();
  let loggedUser;
  if(sessionStorage.getItem('status')==='loggedIn'){
    loggedUser = JSON.parse(sessionStorage.user);
    console.log('LoggedIn user info: ', loggedUser);
  }

  const goToProfile = () =>{
    nav(`/users/${loggedUser._id}`);
  }

  return (
    <div className="navbar">
      <div className='nav-links'>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/users">Users</Link>
        <Link to="/reviews">Reviews</Link>
      </div>
      <div>
        <SearchBar />
      </div>
      <div className='profPicture'>
        <img src={loggedUser?.profilePicture} onClick={goToProfile}/>
      </div>
    </div>
  );
}
