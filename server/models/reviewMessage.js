import mongoose from 'mongoose'
import { v4 as uuid } from 'uuid';

const reviewSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const ReviewMessage = mongoose.model('reviewMessage', reviewSchema);

export default ReviewMessage;