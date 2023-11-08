const BASE_URL = 'http://localhost:8080';

export const showAllUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    const result = await response.json();

    console.log(result);
    return result;
}

export const showSingleUser = async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    const result = await response.json();

    console.log(result);
    return result;
}