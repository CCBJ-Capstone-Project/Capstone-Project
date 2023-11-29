import { useLocation } from 'react-router-dom';
import React from 'react';
import { useEffect, useState } from 'react';
import ReviewInfo from './ReviewInfo';
import { fetchReviews } from '../api/reviewsUtils';

export default function ReviewSearch() {
  let query = useQuery();
  const searchText = query.get('s');
  const [searchedReviews, setSearchedReviews] = useState([]);
  useEffect(() => {
    const reviews = fetchReviews();
    reviews.then((val) => {
      // console.log(val);
      let newReviews = [];
      for (let i in val) {
        let review = val[i];
        if (
          isInText(searchText, review.author.username) ||
          isInText(searchText, review.message)
        ) {
          newReviews.push(review);
        }
      }
      setSearchedReviews(newReviews);
    });
  }, []);
  return (
    <>
      <h1>Search results:</h1>
      <div className="feed">
        {searchedReviews.map((review) => {
          return (
            <ReviewInfo
              key={review._id}
              _id={review._id}
              title={review.title}
              message={review.message}
              author={review.author}
            />
          );
        })}
      </div>
    </>
  );
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function isInText(query, text) {
  //console.log(text);
  return text.toLowerCase().includes(query.toLowerCase());
}
