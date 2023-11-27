import Comment from "../models/commentModel.js";
import ReviewMessage from "../models/reviewModel.js";
import mongoose from "mongoose";

export const getReviewComments = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    console.log('Selected Review ID from Comments Controller: ', reviewId);
    const query = { _id: reviewId };
    const review = await ReviewMessage.findOne(query);
    console.log('Selected Review from Comments Contr: ', review);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    const comments = review.comments;
    console.log("Comments: ", comments);
    res.send(comments);
  } catch (error) {
    console.error('Error getting comments: ', error);
  }
}

export const createComment = async (req, res) => {
  try {
    const comment = req.body;
    const author = req.body.author;
    const reviewId = req.params.reviewId;
    const review = await ReviewMessage.findById(reviewId);
    const updatedComment = { 
      ...comment,
      author: author, 
      review: review 
    };

    console.log('Received comment: ', updatedComment);

    console.log('Updated Review With Comment: ', review);

    // Check if the review exists
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    await updatedComment.save();

    review.comments.push(comment);
    await review.save();

    res.json({ review, comment });
  } catch (error) {
    console.error("Error while adding comment: ", error);
  }
}

export const deleteComment = async (req, res) => {
  try {
    const id = req.params.commentId
    console.log('Comment ID to be deleted: ', id);
    const query = { _id: id };
    console.log('Query to be executed: ', query);

    const result = await Comment.deleteOne(query);
    console.log('Result of deletion: ', result);

    if(result.deletedCount === 1){
      res.status(204).send();
    }
  } catch (error) {
    console.error('Error while deleting review: ', error);
  }
}