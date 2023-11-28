import { useNavigate } from 'react-router-dom';
import ReviewInfo from './ReviewInfo';

export default function Reviews({ reviews }) {
  const nav = useNavigate();

  console.log(reviews);
  return (
    <>
      {reviews.map((i) => {
        //return list(i)
        return (
          <ReviewInfo
            key={i._id}
            _id={i._id}
            title={i.title}
            message={i.message}
            rating={i.rating}
            author={i.author}
          ></ReviewInfo>
        );
      })}
    </>
  );
}
