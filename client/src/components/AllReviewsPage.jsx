import { useState,useEffect } from "react"
import { useNavigate } from 'react-router-dom'

export default function AllReviewsPage({ reviews }){
  const nav = useNavigate();
  return(
    <>
      <h1>All Reviews Page</h1>
      <div>
        {
          reviews.map((review) => {
            return(
              <>
                <div key={review._id} className="review-container">
                  <h2>{review.title}</h2>
                  <h4>{review.message}</h4>

                  <button
                    key={review._id}
                    onClick={() => nav(`/reviews/${review._id}`)}
                  >
                  See Details
                  </button>
                </div>
              </>
            )
          })
        }
      </div>
    </>
  )
}