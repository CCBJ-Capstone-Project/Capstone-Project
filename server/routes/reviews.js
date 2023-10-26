import express from 'express';
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from '../controllers/reviews.js';

const router = express.Router();

//- All routers in here will have /reviews added to URL by default

// GET /reviews -> get all reviews within API
router.get('/', getAllReviews)

// GET /review/:id
router.get('/:id', getReviewById);

// POST /review
router.post('/', createReview);

// PATCH /review/:id
router.patch('/:id', updateReview);

// DELETE /review/:id
router.delete('/:id', deleteReview);

export default router;