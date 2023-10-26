import { v4 as uuid } from 'uuid'; // Create unique id for each review with uuid() function

let reviews = [
  {
    title: '',
    message: '',
    creator: '',
    tags: [''],
    createdAt: {
      type: Date,
      default: new Date()
    },
    id: uuid(),
  }
]

export const getAllReviews = (req, res, next) => {
  try {
    res.send(reviews);
  } catch (error) {
    next(error);
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

export const createReview = (req, res, next) => {
  try {
    const review = req.body;

    // add new review to database with unique id as well
    reviews.push({ ...review, id: uuid() });
    res.send(`Review with message: ${review.message} by review: ${review.creator} added to database`);
  } catch (error) {
    next(error);
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
    const { id } = req.params;

    // Keep all reviews that do not have the selected id
    reviews = reviews.filter((review) => review.id !== id);

    res.send(`Deleted review with id: ${id}`);
  } catch (error) {
    next(error)
  }
}