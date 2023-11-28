import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, LoginPage, HomePage, AllReviewsPage, SingleReview, AllUsersPage, NewReviewForm, UpdateReviewPage, Register, SingleUserPage, UpdateUserPage, UserSearch, ReviewSearch, CommentForm, SingleComment } from './components/imports';
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
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<AllUsersPage users={users} setUsers={setUsers} />} />
        <Route path="/users/:userId" element={<SingleUserPage users={users} />} />
        <Route path="/reviews" element={<AllReviewsPage />} />
        <Route path="/reviews/:reviewId" element={<SingleReview />} />
        <Route path="/edit-user/:userId" element={<UpdateUserPage users={users} />} />
        <Route path="/edit-review-form/:reviewId" element={<UpdateReviewPage reviews={reviews} />} />
        <Route path="/new-review-form/:userId" element={ <NewReviewForm reviews={reviews} setReviews={setReviews} users={users} />} />
        <Route path="/reviewsearch" element={<ReviewSearch></ReviewSearch>} />
        <Route path="/usersearch" element={<UserSearch></UserSearch>} />
        <Route path="/comment-form/:reviewId" element={<CommentForm />} />
        <Route path="/reviews/:reviewId/comments/:commentId" element={<SingleComment/>} />
      </Routes>
    </>
  );
}
export default App;
