import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { fetchReviews, deleteReview, fetchSingleReview } from "../api/reviewsUtils.js";
import { deleteComment, fetchComments, fetchSingleComment } from "../api/commentsUtils.js";

export default function SingleComment(){
  const [selectedComment, setSelectedComment] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const nav = useNavigate();
  const { reviewId, commentId } = useParams();
  console.log('Review ID: ', reviewId, "\nComment ID: ", commentId);
  let loggedUser;
  if(sessionStorage.getItem('status')==='loggedIn'){
      loggedUser = JSON.parse(sessionStorage.user);
      // console.log('LoggedIn user info: ', loggedUser);
  }
  const user = loggedUser;

  async function getReviews(){
    const reviewsArr = await fetchReviews();
    setReviews(reviewsArr);
  }
  
  async function displayComment() {
    if (selectedComment) {
      try {
        const result = await fetchSingleComment(reviewId, commentId);
        console.log('Selected review info: ', result);
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  async function getComments(){
    const commentsArr = await fetchComments(reviewId);
    setComments(commentsArr);
  }

  async function removeComment(){
    try{
      const result = await deleteComment(reviewId, commentId);
      nav(`/reviews/${reviewId}`);
      return result;
    } catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    getReviews();
    displayComment();
    getComments();
  }, []);
  
  useEffect(() => {
    console.log('Review ID from URL:', reviewId);
    console.log('Comment ID from URL:', commentId);
    console.log('Reviews:', reviews);
    console.log('Comments from SingleReview.jsx: ', comments);
    // Use the reviews prop to find the selected review
    const comment = comments.find((comment) => comment._id === commentId);
    setSelectedComment(comment);
    console.log('Selected Comment: ', comment);
  }, [reviewId, commentId, comments]);
  
  return(
    <>
      <div>
      {selectedComment ? (
        <>
          <div className="selected-review-container">
            <div className='review-header'>
              <h2 className='author'>
                <img src={selectedComment.author.profilePicture} alt='Profile Picture' />
                {selectedComment.author.username}
              </h2>
              <h3 className='review-title'>{selectedComment.title}</h3>
            </div>
            <div className='review-message'>
              <p>{selectedComment.message}</p>
            </div>
            {loggedUser ? (
              loggedUser._id===selectedComment.author._id ? (
                <div className="button-row">
                  <button onClick={removeComment}>Delete</button>
                </div>
              ) : (
                <></>
              )
              ) : (
                <></>
            )}
          </div>
        </>
      ) : (
        <p>Comment not found</p>
      )}
    </div>
    </>
  )
}