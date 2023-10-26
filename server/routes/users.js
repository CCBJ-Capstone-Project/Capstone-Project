import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/users.js';

const router = express.Router();

//- All routers in here will have /users added to URL by default

// GET /users
router.get('/', getAllUsers);

// GET /users/:id
router.get('/:id', getUserById);

// POST /users
router.post('/', createUser);

// PATCH /users/:id
router.patch('/:id', updateUser);

// DELETE /users/:id
router.delete('/:id', deleteUser);

export default router;