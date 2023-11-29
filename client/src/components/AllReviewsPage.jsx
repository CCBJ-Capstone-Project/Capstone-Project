import { useState,useEffect } from "react"
import { fetchReviews } from "../api/reviewsUtils";
import Reviews from "./Reviews";

export default function AllReviewsPage(){
  const [reviews, setReviews] = useState([]);
  async function displayReviews(){
    const reviewsArr = await fetchReviews();
    setReviews(reviewsArr);
  }

  useEffect(() => {
    displayReviews();
  }, [])

  // console.log(reviews);
  return(
    <>
      {/* <h1>All Reviews Page</h1> */}
      <div className="feed">
        <Reviews reviews={reviews} />
      </div>
    </>
  )
}