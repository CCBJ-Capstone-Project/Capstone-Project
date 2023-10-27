import { useState,useEffect } from "react"
import { createReview } from "../api/reviewsUtils";
import { useNavigate } from "react-router-dom";

export default function NewReviewForm({ reviews, setReviews }){
  const nav = useNavigate();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await createReview(title, message);
      console.log(result);

      const newReviews = [ ...reviews, result ];
      setReviews(newReviews);

      setTitle('');
      setMessage('');
      nav('/reviews');
    } catch (error) {
      console.error('Error creating review: ', error);
    }
  }

  return(
    <>
      <h1>Create Review</h1>
      <form onSubmit={handleSubmit} method="post">
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
        <button type="submit">Submit Review</button>
      </form>
    </>
  )
}