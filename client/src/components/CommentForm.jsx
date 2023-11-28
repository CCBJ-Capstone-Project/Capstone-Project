import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { fetchReviews } from "../api/reviewsUtils";
import { createComment } from "../api/commentsUtils";

export default function CommentForm(){
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const { reviewId } = useParams();
  const nav = useNavigate();
  let loggedUser;
  if(sessionStorage.getItem('status')==='loggedIn'){
      loggedUser = JSON.parse(sessionStorage.user);
      // console.log('Logged User: ', loggedUser);
  }

  const user = loggedUser;
  
  async function getReviews(){
    const reviewsArr = await fetchReviews();
    setReviews(reviewsArr);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      console.log('Logged User: ', user);
      const comment = {title: title, message: message, author: user}
      const result = await createComment(reviewId, comment);
      console.log("Comment Added: ", result);
      setTitle("");
      setMessage("");
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const review = reviews.find((review) => review._id === reviewId);
    setSelectedReview(review);
  }, [reviewId, reviews]);

  useEffect(() => {
    getReviews();
  }, [])

  return(
    <>
      <h1>Write Comment</h1>
      <form method="PATCH" className="create-review">
        <div>
          <label className="form-row">
            <p className="form-label">Title: </p>
            <input type="text" value={title} size='63' onChange={(e) => {
              setTitle(e.target.value);
            }}/>
          </label>
        </div>
        <div>
          <label className="form-row">
            <p className="form-label">Message: </p>
            <textarea value={message} rows={10} cols={50} onChange={(e) => {
              setMessage(e.target.value);
            }}>
            </textarea>
          </label>
        </div>
        <button type="submit" onClick={handleSubmit}>Submit Comment</button>
      </form>
    </>
  )
}