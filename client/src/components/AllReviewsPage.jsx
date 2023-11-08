import { useState,useEffect } from "react"
import { fetchReviews } from "../api/reviewsUtils";
import Reviews from "./Reviews";

export default function AllReviewsPage({ reviews, setReviews }){
  async function displayReviews(){
    const reviewsArr = await fetchReviews();
    setReviews(reviewsArr);
  }

  useEffect(() => {
    displayReviews();
  }, [])

  console.log(reviews);
  return(
    <>
      <h1>All Reviews Page</h1>
      <Reviews reviews={reviews} />
    </>
  )
}