import UserInfo from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserInfo.find();
    console.log(users);
    res.send(users);
  } catch (error) {
    res.send(error.message);
  }
}

export const getUserById = (req, res) => {
  try {
    // Pull id we are looking for from url
    const { id } = req.params;

    // Find user within users database that has that unique ID
    const foundUser = users.find((user) => user.id === id)

    res.send(foundUser)
  } catch (error) {
    res.send(error);
  }
}

export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new UserInfo(user);
  try {
    await newUser.save()
    res.send(newUser);
  } catch (error) {
    res.send(error);
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

export const deleteUser = (req, res) => {
  const {userId} = req.params;

  try {
    const { _id: id } = req.params;

    // Keep all users that do not have the selected id
    users = users.filter((user) => user.id !== id);

    res.send(`Deleted user with id: ${id}`);
  } catch (error) {
    next(error)
  }
}