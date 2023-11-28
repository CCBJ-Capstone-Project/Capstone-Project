import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  searchUsers,
  updateUser,
} from '../controllers/users.js';

const router = express.Router();

//- All routers in here will have /users added to URL by default

// GET /users
router.get('/', getAllUsers);

router.post('/users/search', async (req, res) => {
  try {
    const { query } = req.body;
    const users = await searchUsers(query);
    res.json(users);
  } catch (error) {
    console.error('Error during user search:', error);
    res.status(500).json({ error: 'An error occurred during user search' });
  }
});

// GET /users/:id
router.get('/:id', getUserById);

// POST /users
router.post('/', createUser);

// PATCH /users/:id
router.patch('/:id', updateUser);

// DELETE /users/:id
router.delete('/:id', deleteUser);

export default router;
