import { useState,useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { fetchReviews } from "../api/reviewsUtils";

export default function AllReviewsPage({ reviews, setReviews }){
  const nav = useNavigate();

  async function displayReviews(){
    const reviewsArr = await fetchReviews();
    setReviews(reviewsArr);
  }

  useEffect(() => {
    displayReviews();
  }, [])

  const list = ({ _id, title, message }) => (
    <div key={_id}>
      <h2>{title}</h2>
      <h4>{message}</h4>

      <button
        onClick={() => nav(`/reviews/${_id}`)}
      >
      See Details
      </button>
    </div>
  )

  console.log(reviews);
  return(
    <>
      <h1>All Reviews Page</h1>
        {reviews.map((i) => {
          return list(i)
        })}
    </>
  )
}