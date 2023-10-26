import mongoose from 'mongoose'
import { v4 as uuidv4, validate as uuidValidate } from "uuid"; // Create unique id for each user with uuid() function

const reviewSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: new Date()
  },
  _id: {
    type: String,
    default: uuidv4
  }
})

const ReviewMessage = mongoose.model('reviewMessage', reviewSchema);

export default ReviewMessage;