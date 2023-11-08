import { useNavigate } from 'react-router-dom'

export default function Reviews({ reviews }){
  const nav = useNavigate();

  const list = ({ _id, title, message }) => (
    <div key={_id}>
      <h2>{title}</h2>
      <h4>{message}</h4>

      <button
        onClick={() => nav(`/reviews/${_id}`)}
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