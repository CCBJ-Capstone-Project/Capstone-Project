import { useState,useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'

export default function SingleReview({ reviews }){
  const nav = useNavigate();
  const { reviewId } = useParams();
  const selectedReview = reviews.find((review) => {
    return review._id == reviewId;
  });

  console.log(selectedReview);

  useEffect(() => {
  }, [])

  return(
    <>
      <h1>{selectedReview.title}</h1>
    </>
  )
}