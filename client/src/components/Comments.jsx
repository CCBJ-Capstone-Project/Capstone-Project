import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteComment } from "../api/commentsUtils";

export default function Comments({ comments }){
  const nav = useNavigate();
  const { reviewId } = useParams();
  let loggedUser;
  if(sessionStorage.getItem('status')==='loggedIn'){
      loggedUser = JSON.parse(sessionStorage.user);
      // console.log('LoggedIn user info: ', loggedUser);
  }
  const user = loggedUser;

  const list = ({ _id, title, message, author }) => {
    const goToPage = async () => {
      nav(`/reviews/${reviewId}/comments/${_id}`);
    }
    return (
      <div key={_id} className='comment-container'>
        <div className='review-header'>
        <h2 className='author'>
          <img src={author.profilePicture} alt='Profile Picture' />
          {author.username}
          </h2>
          <h3 className='review-title'>{title}</h3>
        </div>
        <div className='review-message'>
          <p>{message}</p>
        </div>
        <div>
        {loggedUser ? (
          user._id===author._id ? (
            <button onClick={goToPage}>
              See Details
            </button>
          ) : (
            <></>
          )
          ) : (
            <></>
          )}
        </div>
      </div>
    )
  }

  // console.log('Comments from Comments.jsx: ', comments);
  return(
    <div className="comment-feed">
      {comments.map((i) => {
        return list(i)
      })}
    </div>
  )
}