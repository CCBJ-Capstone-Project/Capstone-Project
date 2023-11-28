const BASE_URL = 'https://capstone-project-server-aa069cbf5e62.herokuapp.com';
const LOCAL_URL = `http://localhost:8080`;
const LOREM_PICSUM_URL = 'https://picsum.photos/100?image=';

const getRandomProfilePicture = () => {
  const imageId = Math.floor(Math.random() * 1085);
  return `${LOREM_PICSUM_URL}${imageId}`;
};

export const showAllUsers = async () => {
  const response = await fetch(`${LOCAL_URL}/users`);
  const result = await response.json();

  // console.log(result);
  return result;
};

export const showSingleUser = async (id) => {
  const response = await fetch(`${LOCAL_URL}/users/${id}`);
  const result = await response.json();

  // console.log(result);
  return result;
};

export const createUser = async (username, password) => {
  try {
    const profilePicture = getRandomProfilePicture();
    const response = await fetch(`${LOCAL_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, profilePicture }),
    });
    const result = await response.json();

    console.log(result);
    return result;
  } catch (error) {
    console.error('Error occurred while creating user: ', error);
    return { success: false };
  }
};

export const updateUser = async (id, username, password) => {
  try {
    if (!username && !password) {
      return;
    }

    if (!username) {
      const response = await fetch(`${LOCAL_URL}/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      console.log('Result of PATCH request: ', result);
      return result;
    }

    if (!password) {
      const response = await fetch(`${LOCAL_URL}/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const result = await response.json();
      console.log('Result of PATCH request: ', result);
      return result;
    } else {
      const response = await fetch(`${LOCAL_URL}/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      console.log('Result of PATCH request: ', result);
      return result;
    }
  } catch (error) {
    console.error('Error occured updating user: ', error);
    return { success: false };
  }
};
