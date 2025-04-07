// Imports
import express from 'express';
import dishesRouter from './src/routes/dishRoute.js';
import { connectDB } from './src/config/dishConfig.js';

// PORT and DATABASE_URI
const PORT = process.env.PORT || 3000;

// Create express and use json format
const app = express();
app.use(express.json());

//Routes
app.use('/api/dishes', dishesRouter);

// Connect to database
connectDB();

// Error handler 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler 500
app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.error(err);
  res.status(status).json({
    status,
    message: err.message,
  });
});

// Start server and listen to port
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
