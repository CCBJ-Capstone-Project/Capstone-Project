const BASE_URL = 'http://localhost:8080';

export const showAllUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    const result = await response.json();

    // console.log(result);
    return result;
}

export const showSingleUser = async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    const result = await response.json();

    // console.log(result);
    return result;
}

export const createUser = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        });
        const result = await response.json();

        console.log(result);
        return result;
    } catch (error) {
        console.error('Error occurred while creating review: ', error);
        return { success: false };
    }
};