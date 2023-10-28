const BASE_URL = 'http://localhost:8080';

export const fetchReviews = async () => {
  const response = await fetch(`${BASE_URL}/reviews`);
  const result = await response.json();

  // console.log(result);
  return result;
}

export const fetchSingleReview = async (id) => {
  const response = await fetch(`${BASE_URL}/reviews/${id}`);
  const result = await response.json();

  // console.log(result);
  return result;
}

export const createReview = async (title, message) => {
  try {
    const response = await fetch(`${BASE_URL}/reviews`, 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, message })
    });
    const result = await response.json();

    console.log(result);
    return result;
  } catch (error) {
    console.error('Error occurred while creating review: ', error);
    return { success: false }
  }
}

export const updateReview = async (id, message) => {
  try {
    const response = await fetch(`${BASE_URL}/reviews/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const result = response.json();
    console.log('Result of PATCH request: ', result);
    return result;
  } catch (error) {
    console.error('Error occured updating review: ', error);
    return { success: false }
  }
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