const BASE_URL = 'https://capstone-project-server-aa069cbf5e62.herokuapp.com';
const LOCAL_URL = 'http://localhost:8080';

export const fetchComments = async (id) => {
  try {
    const response = await fetch(`${LOCAL_URL}/reviews/${id}/comments`);
    const result = await response.json();
    console.log('Comments from fetchComments function: ', result);
    return result;
  } catch (error) {
    console.error('Error getting comments: ', error);
  }
}

export const fetchSingleComment = async (reviewId, commentId) => {
  try {
    const response = await fetch(`${LOCAL_URL}/reviews/${reviewId}/comments/${commentId}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error: ', error);
  }
}

export const createComment = async (reviewId, comment) => {
  try {
    console.log('Received comment: ', comment);
    const response = await fetch(`${LOCAL_URL}/reviews/${reviewId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment)
    });

    console.log('Response Status: ', response.status);

    const result = await response.json();
    console.log('Result of adding comment: ', result);
    return result;
  } catch (error) {
    console.error('Error adding comment: ', error);
  }
}

export const deleteComment = async (reviewId, commentId) => {
  try {
    const response = await fetch(`${LOCAL_URL}/reviews/${reviewId}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      // Status code 204 indicates a successful deletion with no content.
      return { success: true };
    } else {
      const result = await response.json();
      console.log('Result of Deletion: ', result);
      return result;
    }
  } catch (error) {
    console.error('An error occurred while deleting the comment:', error);
    return { success: false };
  }
}