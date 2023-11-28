import { useState,useEffect } from "react"
import { fetchReviews, createReview } from "../api/reviewsUtils";
import { showAllUsers } from "../api/usersUtils";
import { useNavigate, useParams } from "react-router-dom";

export default function NewReviewForm(){
  const nav = useNavigate();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const { userId } = useParams();
  let loggedUser;
  if(sessionStorage.getItem('status')==='loggedIn'){
      loggedUser = JSON.parse(sessionStorage.user);
      // console.log('Logged User: ', loggedUser);
  }

  async function getReviews(){
    const reviewsArr = await fetchReviews();
    setReviews(reviewsArr);
  }
  async function getUsers(){
    const usersArr = await showAllUsers();
    setUsers(usersArr);
  }

  const user = loggedUser;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Title: ', title, ' Message: ', message, ' Author: ', user);
      const result = await createReview(title, message, user);
      console.log(result);

      const newReviews = [ ...reviews, result ];
      setReviews(newReviews);

      setTitle('');
      setMessage('');
      nav('/reviews');
    } catch (error) {
      console.error('Error creating review: ', error);
    }
  }

  useEffect(() => {
    getReviews();
    getUsers();
  }, [])

  return(
    <>
      <h1>Create Review</h1>
      <form onSubmit={handleSubmit} method="post" className="create-review">
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
        <button type="submit">Submit Review</button>
      </form>
    </>
  )
}