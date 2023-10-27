import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { fetchReviews, fetchUsers } from './api'
import Navbar from './components/Navbar'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import AllReviewsPage from './components/AllReviewsPage'
import SingleReview from './components/SingleReviewPage';
import AllUsersPage from './components/AllUsersPage';
import Register from './components/RegisterPage'
import './App.css'

function App() {
  const [form, setForm] = useState('');
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);

  async function displayReviews(){
    const reviewsArr = await fetchReviews();
    setReviews(reviewsArr);
  }

  useEffect(() => {
    displayReviews();
  }, [])
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}/> 
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/users' element={<AllUsersPage users={users}/>}/>
        <Route path='/users/:userId' element={<SingleUser users={users}/>}/>
        <Route path='/reviews' element={<AllReviewsPage reviews={reviews}/>}/>
        <Route path='/reviews/:reviewId' element={<SingleReview reviews={reviews}/>}/>
      </Routes>
    </>
  )
}

export default App
