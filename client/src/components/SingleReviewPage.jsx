import { useState,useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { deleteReview } from "../api";

export default function SingleReview({ reviews }){
  const nav = useNavigate();
  const { reviewId } = useParams();
  const selectedReview = reviews.find((review) => {
    return review._id == reviewId;
  });

  async function removeReview(review){
    try{
      const result = await deleteReview(review._id);
      if(result.success){
        console.log('Review deleted successfully!');
        nav('/reviews');
      } else{
        console.error('Failed to delete review...');
      }
    } catch(error){
      console.error(error);
    }
  }

  console.log(selectedReview);

  useEffect(() => {
  }, [])

  return(
    <>
      <h1>{selectedReview.title}</h1>
      <h1>{selectedReview.message}</h1>
      <button onClick={removeReview}>Delete</button>
    </>
  )
}