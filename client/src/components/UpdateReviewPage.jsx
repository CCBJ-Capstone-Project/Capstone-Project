import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { updateReview } from "../api/reviewsUtils"

export default function UpdateReviewPage({ reviews }){
  const nav = useNavigate();
  const { reviewId } = useParams();
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(undefined);

  /// TODO: Navigate back to all reviews page after updating review
  async function editReview(e){
    e.preventDefault();
    try {
      const result = await updateReview(reviewId, title, message, rating);
      console.log(`Review with id: ${reviewId} has been updated!`);
      setMessage('');
      setTitle('');
      setRating(undefined);
      nav(`/reviews/${reviewId}`);
      return result;
    } catch (error) {
      console.error('Error updating review: ', error);
    }
  }

  /// TODO: Fix form to where user can choose to update only the message/title
  return(
    <>
      <h1>Update Review</h1>
      <form method="PATCH">
        <label>
          Title: 
          <input type="text" value={title} onChange={(e) => {
            setTitle(e.target.value);
          }}/>
        </label>
        <label>
          Message: 
          <input type="text" value={message} onChange={(e) => {
            setMessage(e.target.value);
          }}/>
        </label>
        <label>
          Rating (1-10): 
          <input type="number" value={rating} onChange={(e) => {
            setRating(e.target.value);
          }}/>
        </label>
        <button onClick={editReview}>Update Review</button>
      </form>
    </>
  )
}