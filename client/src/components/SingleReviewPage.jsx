import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { fetchReviews, deleteReview, fetchSingleReview } from "../api/reviewsUtils.js";

export default function SingleReview(){
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const nav = useNavigate();
  const { reviewId } = useParams();

  async function getReviews(){
    const reviewsArr = await fetchReviews();
    setReviews(reviewsArr);
  }

  async function displayReview() {
    if (selectedReview) {
      try {
        const result = await fetchSingleReview(selectedReview._id);
        console.log('Selected review info: ', result);
      } catch (error) {
        console.error(error);
      }
    }
  }
  
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
  
  function goToEditForm(){
    nav(`/edit-review-form/${reviewId}`);
  }
  
  useEffect(() => {
    console.log('Review ID from URL:', reviewId);
    console.log('Reviews:', reviews);
    // Use the reviews prop to find the selected review
    const review = reviews.find((review) => review._id === reviewId);
    setSelectedReview(review);
    console.log('Selected Review: ', review);
  }, [reviewId, reviews]);

  useEffect(() => {
    getReviews();
    displayReview();
  }, []);
  
  return(
    <>
      <div>
      {selectedReview ? (
        <>
          <h1>{selectedReview.title}</h1>
          <h1>{selectedReview.message}</h1>
          <div>
            <button onClick={removeReview}>Delete</button>
            <button onClick={goToEditForm}>Update</button>
          </div>
        </>
      ) : (
        <p>Review not found</p>
      )}
    </div>
    </>
  )
}