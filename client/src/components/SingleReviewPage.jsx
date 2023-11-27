import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { fetchReviews, deleteReview, fetchSingleReview } from "../api/reviewsUtils.js";
import { fetchComments } from "../api/commentsUtils.js";
import Comments from "./Comments.jsx";

export default function SingleReview(){
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const nav = useNavigate();
  const { reviewId } = useParams();
  let loggedUser;
  if(sessionStorage.getItem('status')==='loggedIn'){
      loggedUser = JSON.parse(sessionStorage.user);
      // console.log('LoggedIn user info: ', loggedUser);
  }

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
  
  async function getComments(){
    const commentsArr = await fetchComments(reviewId);
    setComments(commentsArr);
  }
  
  function goToCommentPage(){
    nav(`/comment-form/${reviewId}`);
  }
  
  function goToEditForm(){
    nav(`/edit-review-form/${reviewId}`);
  }

  useEffect(() => {
    getReviews();
    displayReview();
    getComments();
  }, []);
  
  useEffect(() => {
    console.log('Review ID from URL:', reviewId);
    console.log('Reviews:', reviews);
    console.log('Comments from SingleReview.jsx: ', comments);
    // Use the reviews prop to find the selected review
    const review = reviews.find((review) => review._id === reviewId);
    setSelectedReview(review);
    console.log('Selected Review: ', review);
  }, [reviewId, reviews]);
  
  return(
    <>
      <div>
      {selectedReview ? (
        <>
          <div className="selected-review-container">
            <div className='review-header'>
              <h2 className='author'>
                <img src={selectedReview.author.profilePicture} alt='Profile Picture' />
                {selectedReview.author.username}
              </h2>
              <h3 className='review-title'>{selectedReview.title}</h3>
            </div>
            <div className='review-message'>
              <p>{selectedReview.message}</p>
            </div>
            {loggedUser ? (
              loggedUser.username===selectedReview.author.username && loggedUser.password===selectedReview.author.password ? (
                <div className="button-row">
                  <button onClick={removeReview}>Delete</button>
                  <button onClick={goToEditForm}>Update</button>
                  <button onClick={goToCommentPage}>Write Comment</button>
                </div>
              ) : (
                <div className="buton-row">
                  <button onClick={goToCommentPage}>Write Comment</button>
                </div>
              )
              ) : (
                <p>Log in to create your own review!</p>
            )}
          </div>
          <>
            <Comments comments={comments} />
          </>
        </>
      ) : (
        <p>Review not found</p>
      )}
    </div>
    </>
  )
}