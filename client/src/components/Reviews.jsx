import { useNavigate } from 'react-router-dom'

export default function Reviews({ reviews }){
  const nav = useNavigate();

  const list = ({ _id, title, message, author }) => (
    <div key={_id} className='review-container'>
      <div className='review-header'>
        <h2 className='author'>{author.username}</h2>
        <h3 className='review-title'>{title}</h3>
      </div>
      <div className='review-message'>
        <h4>{message}</h4>
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
      <div className='feed'>
        {reviews.map((i) => {
          return list(i)
        })}
      </div>
    </>
  )
}