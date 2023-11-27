import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Comments({ comments }){
  const list = ({ _id, title, message, author }) => {
    return (
      <div key={_id} className='comment-container'>
        <div className='review-header'>
          <h2 className="author">
            <img src={author.profilePicture} alt="Profile Picture" />
          </h2>
          <h3 className='review-title'>{title}</h3>
        </div>
        <div className='review-message'>
          <p>{message}</p>
        </div>
        <div>
          <button
            className="details-button">
              See Details
          </button>
        </div>
      </div>
    )
  }

  console.log('Comments from Comments.jsx: ', comments);
  return(
    <div className="comment-feed">
      {comments.map((i) => {
        return list(i)
      })}
    </div>
  )
}