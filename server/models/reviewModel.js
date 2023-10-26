import mongoose from 'mongoose'
import { v4 as uuidv4, validate as uuidValidate } from "uuid"; // Create unique id for each user with uuid() function
import UserInfo from './userModel.js';

const reviewSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInfo'
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const ReviewMessage = mongoose.model('reviewMessage', reviewSchema);

export default ReviewMessage;