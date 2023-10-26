import ReviewMessage from "../models/reviewModel.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewMessage.find();
    console.log(reviews);
    res.send(reviews);
  } catch (error) {
    res.send(error.message);
  }
}

export const getReviewById = (req, res, next) => {
  try {
    // Pull id we are looking for from url
    const { id } = req.params;

    // Find review within reviews database that has that unique ID
    const review = reviews.find((review) => review.id === id)

    res.send(review)
  } catch (error) {
    next(error);
  }
}

export const createReview = async (req, res) => {
  const review = req.body;
  const newReview = new ReviewMessage(review);
  try {
    await newReview.save()
    res.send(newReview);
  } catch (error) {
    res.send(error);
  }
}

export const updateReview = (req, res, next) => {
  try {
    // Get variables that can be changed
    const { title, message } = req.body;

    const { id } = req.params;
    const review = reviews.find((review) => review.id===id);

    // Check to see which variable the review wants to update
    if(title){
      review.title = title;
    }
    if(message){
      review.message = message;
    }

    res.send(`Updating review with id: ${id}`)
  } catch (error) {
    next(error);
  }
}

export const deleteReview = (req, res, next) => {
  try {
    const { _id: id } = req.params;

    // Keep all reviews that do not have the selected id
    reviews = reviews.filter((review) => review.id !== id);

    res.send(`Deleted review with id: ${id}`);
  } catch (error) {
    next(error)
  }
}