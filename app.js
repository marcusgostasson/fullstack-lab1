import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const router = express.Router();

mongoose.connect(process.env.CONNECTION_URL)
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => {console.log('Connected to Database');});

app.use(express.json());
app.use('/', router);

router.get('/api/dishes', async (req, res, next) => {
});

router.get('/api/dishes/:name', async (req, res, next) => {
  });

router.post('/api/dishes', async (req, res, next) => {
  });
  
router.put('/api/dishes/:id', async (req, res, next) => {
});

router.delete('/api/dishes/:id', async (req, res, next) => {
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.error(err);
  res.status(status).json({
    status,
    message: err.message,
  });
});

app.listen(5000, () => {
  console.log(`Server started in port 5000`);
});
