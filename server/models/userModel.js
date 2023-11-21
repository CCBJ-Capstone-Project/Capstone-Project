import mongoose from 'mongoose'
import { v4 as uuidv4, validate as uuidValidate } from "uuid"; // Create unique id for each user with uuid() function
import ReviewMessage from './reviewModel.js';


// TODO: fix posts array to add posts to each users profile as well
  /**
   * Might not be necessary 
   * -> Not standard practice to put posts with the user object
   * -> Instead link author object within each separate review (already implemented)
  */
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

const UserInfo = mongoose.model('UserInfo', userSchema);

export default UserInfo;

// Function to update postCount when a review is posted
UserInfo.updatePostCount = async (userId) => {
  try {
    const user = await UserInfo.findById(userId);
    if (user) {
      user.postCount += 1; // Increment postCount
      await user.save(); // Save the updated user document
    }
  } catch (error) {
    console.error('Error updating postCount:', error);
  }
};