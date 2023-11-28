import mongoose from 'mongoose'
import { v4 as uuidv4, validate as uuidValidate } from "uuid"; // Create unique id for each user with uuid() function
import UserInfo from './userModel.js';
import Comment from './commentModel.js';

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReviewMessage'
  }],
  postCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  profilePicture: String
})

const commentSchema = mongoose.Schema({
  title: String,
  message: String,
  author: userSchema,
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const reviewSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  author: userSchema,
  tags: [String],
  createdAt: {
    type: Date,
    default: new Date()
  },
  comments: [commentSchema]
})

const ReviewMessage = mongoose.model('reviewMessage', reviewSchema);

export default ReviewMessage;