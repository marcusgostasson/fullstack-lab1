// Imports
import express from 'express';
import { getAllDishes, getDishByName, postDish, putDishById, deleteDishById } from '../controllers/dishController.js';

// Create express router
const router = express.Router();

// GET all dishes
router.get('/', getAllDishes);

// GET dish by name
router.get('/:name', getDishByName);

// POST dish
router.post('/', postDish);

// PUT dish by id
router.put('/:id', putDishById);

// DELETE dish by id
router.delete('/:id', deleteDishById);

export default router;
