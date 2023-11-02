import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { updateReview } from "../api/reviewsUtils"

export default function UpdateReviewPage({ reviews }){
  const nav = useNavigate();
  const { reviewId } = useParams();
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  // TODO: Navigate back to all reviews page after updating review
  async function editReview(){
    try {
      const result = await updateReview(reviewId, title, message);
      console.log(`Review with id: ${reviewId} has been updated!`);
      setMessage('');
      setTitle('');
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
        <button onClick={editReview}>Update Review</button>
      </form>
    </>
  )
}