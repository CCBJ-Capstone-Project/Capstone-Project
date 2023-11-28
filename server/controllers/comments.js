import Comment from "../models/commentModel.js";
import ReviewMessage from "../models/reviewModel.js";
import mongoose from "mongoose";

export const getReviewComments = async (req, res) => {
  try {
    console.log('Raw Params: ', req.params);
    const reviewId = req.params.reviewId.toString();
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

export const getSingleComment = async (req, res) => {
  try {
    const reviewId = req.params.reviewId.toString();
    const commentId = req.params.commentId;
    const reviewQuery = { _id: reviewId };
    const commentQuery = { _id: commentId };
    console.log('Review ID: ', reviewQuery, '\n');
    console.log('Comment ID: ', commentQuery, '\n');

    const review = await ReviewMessage.findOne(reviewQuery)
    console.log('Selected Review: ', review, '\n');

    const comment = review.comments.find((comment) => comment._id.toString()===commentId);
    console.log('Selected Comment: ', comment, '\n');
    res.send(comment);
  } catch (error) {
    console.error('Error getting comment: ', error);
  }
}

export const createComment = async (req, res) => {
  try {
    const comment = req.body;
    const author = comment.author;
    const reviewId = req.params.reviewId;
    const review = await ReviewMessage.findById(reviewId);
    
    const commentsArr = review.comments;
    console.log('Comment: ', comment, '\n');
    console.log('Author: ', author);
    console.log('Current Review: ', review, '\n');
    console.log('Current comments: ', commentsArr, '\n');
    
    // Check if the review exists
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    review.comments.push(comment);
    await review.save();
    console.log('Updated Review With Comment: ', review, '\n');

    res.json(review);
  } catch (error) {
    console.error("Error while adding comment: ", error);
  }
}

export const deleteComment = async (req, res) => {
  try {
    console.log('Raw Params: ', req.params, '\n');
    const commentId = req.params.commentId
    const reviewId = req.params.reviewId.toString();
    console.log('Comment ID to be deleted: ', commentId, '\n');
    console.log('Review ID with comment: ', reviewId, '\n');

    const commentQuery = { _id: commentId };
    const reviewQuery = { _id: reviewId };
    console.log('Comment query to be executed: ', commentQuery, '\n');
    console.log('Review query to be executed: ', reviewQuery, '\n');

    const review = await ReviewMessage.findOne(reviewQuery);
    console.log('Review with comment: ', review, '\n');

    const newCommentsArr = review.comments.filter((i) => i._id.toString() !== commentId);
    review.comments = newCommentsArr;

    console.log('New Review Object: ', review, '\n');

    // Save the updated review object back to the database
    await review.save();

    res.status(204).send();
  } catch (error) {
    console.error('Error while deleting comment: ', error);
  }
}