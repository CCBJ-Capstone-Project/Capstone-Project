import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { fetchReviews } from './api'
import Navbar from './components/Navbar'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import AllReviewsPage from './components/AllReviewsPage'
import SingleReview from './components/SingleReviewPage';
import AllUsersPage from './components/AllUsersPage';
import './App.css'

function App() {
  const [reviews, setReviews] = useState([]);

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
        <Route path='/users' element={<AllUsersPage />}/>
        <Route path='/reviews' element={<AllReviewsPage reviews={reviews}/>}/>
        <Route path='/reviews/:reviewId' element={<SingleReview reviews={reviews}/>}/>
      </Routes>
    </>
  )
}

export default App
