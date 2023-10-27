import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { deleteReview, fetchSingleReview } from "../api/reviewsUtils.js";

export default function SingleReview({ reviews }){
  const nav = useNavigate();
  const { reviewId } = useParams();

  const selectedReview = reviews.find((review) => {
    return review._id == reviewId;
  });

  async function displayReview(){
    const result = await fetchSingleReview(selectedReview._id);
    console.log('Selected review info: ', result);
    return result;
  }

  useEffect(() => {
    displayReview();
  }, []);

  /// TODO: fix so webpage dynamically update the reviews list (right now it can be deleted, but need to refresh)
  async function removeReview(){
    try{
      const result = await deleteReview(reviewId);
      nav('/reviews');
      return result;
    } catch(error){
      console.error(error);
    }
  }

  return(
    <>
      <h1>{selectedReview.title}</h1>
      <h1>{selectedReview.message}</h1>
      <button onClick={removeReview}>Delete</button>
    </>
  )
}