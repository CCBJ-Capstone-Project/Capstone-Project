import { useNavigate } from 'react-router-dom'

export default function Reviews({ reviews }){
  const nav = useNavigate();

  const list = ({ _id, title, message, author }) => (
    <div key={_id} className='review-container'>
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

      <button
        onClick={() => nav(`/reviews/${_id}`)}
        className='details-button'
      >
      See Details
      </button>
    </div>
  )

  console.log(reviews);
  return(
    <>
      {reviews.map((i) => {
        return list(i)
      })}
    </>
  )
}