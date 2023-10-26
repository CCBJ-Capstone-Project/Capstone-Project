import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(bodyParser.json());

app.listen(
  PORT,
  () => console.log(`Server running on http://localhost:${PORT}`)
);

app.get('/', (req, res, next) => {
  try {
    res.send('Hello From Home Page')
  } catch (error) {
    next(error);
  }
})


import usersRoutes from './routes/users.js';
app.use('/users', usersRoutes);

import reviewsRoutes from './routes/reviews.js';
app.use('/reviews', reviewsRoutes);