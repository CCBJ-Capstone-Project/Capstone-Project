import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { fetchReviews } from './api/reviewsUtils'
import Navbar from './components/Navbar'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import AllReviewsPage from './components/AllReviewsPage'
import SingleReview from './components/SingleReviewPage';
import AllUsersPage from './components/AllUsersPage';
import NewReviewForm from './components/NewReviewForm'
import UpdateReviewPage from './components/UpdateReviewPage'
import Register from './components/RegisterPage'
import './App.css'

function App() {
  const [form, setForm] = useState('');
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
   const [currentform, setCurrentForm] = UseState['login']
  const toggleForm = (formName) => {
    setCurrentForm(formname);

  async function getReviews(){
    const reviewsArr = await fetchReviews();
    setReviews(reviewsArr);
  }

  useEffect(() => {
    getReviews();
  }, [])
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}/> 
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/users' element={<AllUsersPage users={users} setUsers= {setUsers}/>}/>
        {/* <Route path='/users/:userId' element={<SingleUser users={users}/>}/> */}
        <Route path='/reviews' element={<AllReviewsPage reviews={reviews} setReviews={setReviews}/>}/>
        <Route path='/reviews/:reviewId' element={<SingleReview reviews={reviews}/>}/>
        <Route path='/edit-review-form/:reviewId' element={<UpdateReviewPage reviews={reviews}/>}/>
        <Route path='/new-review-form' element={<NewReviewForm reviews={reviews} setReviews={setReviews}/>}/>
      </Routes>
    </>
  )
}

export default App
