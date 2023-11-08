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

  async function getReviews(){
    const reviewsArr = await fetchReviews();
    setReviews(reviewsArr);
  }
  async function getUsers(){
    const usersArr = await showAllUsers();
    setUsers(usersArr);
  }

  const user = users.find((user) =>{
    return user._id == userId;
  })

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
      <form onSubmit={handleSubmit} method="post">
        <label>
          Title: 
          <input type="text" value={title} onChange={(e) => {
            setTitle(e.target.value);
          }}/>
        </label>
        <label>
          Message: 
          <input type="text" value={message} onChange={(e) => {
            setMessage(e.target.value);
          }}/>
        </label>
        <button type="submit">Submit Review</button>
      </form>
    </>
  )
}