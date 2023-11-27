import express from 'express';
import { getReviewComments, createComment, deleteComment } from '../controllers/comments.js';

const router = express.Router();

//- All routers in here will have /reviews added to URL by default

// GET /reviews/:reviewId/comments
router.get('/:reviewId/comments', getReviewComments);

// POST /reviews/:reviewId/comments
router.post('/:reviewId/comments', createComment);

// POST /reviews/:reviewId/comments
router.delete('/:reviewId/comments/:commentId', deleteComment);

export default router;