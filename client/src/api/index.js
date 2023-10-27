const BASE_URL = 'http://localhost:8080';

export const fetchReviews = async () => {
  const response = await fetch(`${BASE_URL}/reviews`);
  const result = await response.json();

  // console.log(result);
  return result;
}

export const deleteReview = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/reviews/${id}`, 
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    if (response.status === 204) {
      // Status code 204 indicates a successful deletion with no content.
      return { success: true };
    } else {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.error("An error occurred while deleting the review:", error);
    return { success: false };
  }
}