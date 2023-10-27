import { useState,useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { deleteReview } from "../api";

export default function SingleReview({ reviews }){
  const nav = useNavigate();
  const { reviewId } = useParams();
  const selectedReview = reviews.find((review) => {
    return review._id == reviewId;
  });

  // TODO: fix so webpage dynamically update the reviews list (right now it can be deleted, but need to refresh page)
    /**
     * For some reason it is removed from the API itself, but webpage receives an error
     * --> Prevents dynamic update without refreshing webpage
     */
  async function removeReview(){
    try{
      const result = await deleteReview(reviewId);
      nav('/reviews');
      reviews = reviews.filter(review => review._id !== reviewId);
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