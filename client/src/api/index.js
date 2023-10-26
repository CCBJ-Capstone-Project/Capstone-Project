const BASE_URL = 'http://localhost:8080';

export const fetchReviews = async () => {
  const response = await fetch(`${BASE_URL}/reviews`);
  const result = await response.json();

  // console.log(result);
  return result;
}