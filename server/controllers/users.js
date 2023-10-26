import { v4 as uuid } from 'uuid'; // Create unique id for each user with uuid() function

let users = [
  {
    username: 'tester1',
    password: 'password1',
    id: uuid(),
  },
  {
    username: 'tester2',
    password: 'password2',
    id: uuid(),
  },
]

export const getAllUsers = (req, res, next) => {
  try {
    // console.log(users);
    res.send(users);
  } catch (error) {
    next(error);
  }
}

export const getUserById = (req, res, next) => {
  try {
    // Pull id we are looking for from url
    const { id } = req.params;

    // Find user within users database that has that unique ID
    const foundUser = users.find((user) => user.id === id)

    res.send(foundUser)
  } catch (error) {
    next(error);
  }
}

export const createUser = (req, res, next) => {
  try {
    const user = req.body;

    // add new user to database with unique id as well
    users.push({ ...user, id: uuid() });
    res.send(`Username: ${user.username} Password: ${user.password} added to database`);
  } catch (error) {
    next(error);
  }
}

export const updateUser = (req, res, next) => {
  try {
    // Get variables that can be changed
    const { username, password } = req.body;

    const { id } = req.params;
    const user = users.find((user) => user.id===id);

    // Check to see which variable the user wants to update
    if(username){
      user.username = username;
    }
    if(password){
      user.password = password;
    }

    res.send(`Updating user with id: ${id}`)
  } catch (error) {
    next(error);
  }
}

export const deleteUser = (req, res, next) => {
  try {
    const { id } = req.params;

    // Keep all users that do not have the selected id
    users = users.filter((user) => user.id !== id);

    res.send(`Deleted user with id: ${id}`);
  } catch (error) {
    next(error)
  }
}