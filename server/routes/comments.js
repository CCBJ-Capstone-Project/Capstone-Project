import express from 'express';
import { getReviewComments, createComment, deleteComment, getSingleComment } from '../controllers/comments.js';

const router = express.Router();

//- All routers in here will have /reviews added to URL by default

// GET /reviews/:reviewId/comments
router.get('/:reviewId/comments', getReviewComments);

// GET /reviews/:reviewId/comments
router.get('/:reviewId/comments/:commentId', getSingleComment);

// POST /reviews/:reviewId/comments
router.post('/:reviewId/comments', createComment);

// PATCH /reviews/:reviewId/comments
router.delete('/:reviewId/comments/:commentId', deleteComment);

export default router;