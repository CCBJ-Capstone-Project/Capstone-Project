import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { fetchReviews } from './api/reviewsUtils';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import AllReviewsPage from './components/AllReviewsPage';
import SingleReview from './components/SingleReviewPage';
import AllUsersPage from './components/AllUsersPage';
import NewReviewForm from './components/NewReviewForm';
import UpdateReviewPage from './components/UpdateReviewPage';
import Register from './components/RegisterPage';
import SingleUserPage from './components/SingleUserPage';
import './App.css';
import './login.css';
import './reviews.css';

function App() {
  const [form, setForm] = useState('');
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}/> 
        <Route path='/login' element={<LoginPage />}/>
        <Route path="/register" element={<Register />}/>
        <Route path='/users' element={<AllUsersPage users={users} setUsers= {setUsers}/>}/>
        <Route path='/users/:userId' element={<SingleUserPage users={users}/>}/>
        <Route path='/reviews' element={<AllReviewsPage />}/>
        <Route path='/reviews/:reviewId' element={<SingleReview />}/>
        <Route path='/edit-review-form/:reviewId' element={<UpdateReviewPage reviews={reviews}/>}/>
        <Route path='/new-review-form/:userId' element={<NewReviewForm reviews={reviews} setReviews={setReviews} users={users}/>}/>
        <Route path='reviews/search/:searchTerm' />
      </Routes>
    </>
  );
}
export default App;
