import ReviewMessage from "../models/reviewModel.js";
import mongoose from "mongoose";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewMessage.find().populate('author');
    // console.log(reviews);
    res.send(reviews);
  } catch (error) {
    res.send(error.message);
  }
}

export const getReviewById = async (req, res) => {
  try {
    // Pull id we are looking for from url
    const id = req.params.id;
    const query = { _id: id };

    // Find review within reviews database that has that unique ID
    const review = await ReviewMessage.find(query);

    res.send(review)
  } catch (error) {
    res.send(error.message);
  }
}

export const createReview = async (req, res) => {
  const review = req.body;
  const reviewId = new mongoose.Types.ObjectId();
  const authorId = req.body.author;
  const reviewWithIds = { ...review, reviewId, authorId };
  const newReview = new ReviewMessage(reviewWithIds);
  try {
    await newReview.save()
    res.send(newReview);
  } catch (error) {
    res.send(error.message);
  }
}

export const updateReview = async (req, res) => {
  try {
    const id = req.params.id;
    // Get variables that can be changed
    const { title, message, tags } = req.body;

    const query = { _id: id };

    const result = await ReviewMessage.updateOne(query,{
      $set: {
        title: title,
        message: message,
        tags: tags
      }
    });

    res.send(`Updated Reviews: ${result.modifiedCount} ID: ${id}`);
  } catch (error) {
    res.send(error.message);
  }
}

export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const query = { _id: reviewId };

    const result = await ReviewMessage.deleteOne(query);

    res.send(`Reviews Deleted: ${result.deletedCount} ID: ${reviewId}`);
  } catch (error) {
    res.send(error.message);
  }
}