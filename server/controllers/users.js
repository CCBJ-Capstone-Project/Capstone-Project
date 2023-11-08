import mongoose from 'mongoose';
import UserInfo from '../models/userModel.js';

const getUsersWithPosts = async (username) => {
  return UserInfo.find({ username: username })
    .populate('posts').exec((err, posts) => {
      console.log("Populated User " + posts);
    })
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserInfo.find();
    console.log(users);
    res.send(users);
  } catch (error) {
    res.send(error.message);
  }
}

export const getUserById = async (req, res) => {
  try {
    // Pull id we are looking for from url
    const id = req.params.id;
    const reviewId = req.body.posts;
    const query = { _id: id };

    // Find User within Users database that has that unique ID
    const user = await UserInfo.find(query);
    const userWithReviews = { ...user, reviewId };

    res.send(userWithReviews)
  } catch (error) {
    res.send(error.message);
  }
}

export const createUser = async (req, res) => {
  const user = req.body;
  const userId = new mongoose.Types.ObjectId();
  const userWithId = { ...user, userId};
  const newUser = new UserInfo(userWithId);
  try {
    await newUser.save()
    res.send(newUser);
  } catch (error) {
    res.send(error.message);
  }
}

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    // Get variables that can be changed
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

    if(result.deletedCount === 1){
      res.status(204).send();
    }
  } catch (error) {
    console.error('Error while deleting user: ', error);
  }
}