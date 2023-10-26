import mongoose from 'mongoose'
import { v4 as uuidv4, validate as uuidValidate } from "uuid"; // Create unique id for each user with uuid() function

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  postCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  _id: {
    type: String,
    default: uuidv4
  }
})

const UserInfo = mongoose.model('UserInfo', userSchema);

export default UserInfo;