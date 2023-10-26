import UserInfo from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserInfo.find();
    // console.log(users);
    res.send(users);
  } catch (error) {
    res.send(error.message);
  }
}

export const getUserById = async (req, res) => {
  try {
    // Pull id we are looking for from url
    const id = req.params.id;
    const query = { _id: id };

    // Find User within Users database that has that unique ID
    const user = await UserInfo.find(query);

    res.send(user)
  } catch (error) {
    res.send(error.message);
  }
}

export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new UserInfo(user);
  try {
    await newUser.save()
    res.send(newUser);
  } catch (error) {
    res.send(error.message);
  }
}

export const updateUser = async (req, res) => {
  try {
    // Get variables that can be changed
    const id = req.params.id;
    const { username, password } = req.body;

    const query = { _id: id };

    const result = await UserInfo.updateOne(query,{
      $set: {
        username: username,
        password: password
      }
    });

    res.send(`Updated Users: ${result.modifiedCount} ID: ${id}`);
  } catch (error) {
    res.send(error.message);
  }
}

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const query = { _id: userId };

    const result = await UserInfo.deleteOne(query);

    res.send(`Users Deleted: ${result.deletedCount} ID: ${userId}`);
  } catch (error) {
    res.send(error.message);
  }
}