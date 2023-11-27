import mongoose from 'mongoose'
import { v4 as uuidv4, validate as uuidValidate } from "uuid"; // Create unique id for each user with uuid() function
import UserInfo from './userModel.js';
import ReviewMessage from './reviewModel.js';

const commentSchema = mongoose.Schema({
  title: String,
  message: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInfo'
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReviewMessage'
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;