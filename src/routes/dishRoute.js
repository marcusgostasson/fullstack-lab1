import express from 'express';
import { getAllDishes } from '../controllers/dishController.js';

const router = express.Router();

router.get('/', getAllDishes);

/*
router.get('/:name', getDishByName);
router.post('/', postDish);
router.put('/:id', putDishById);
router.delete('/:id', deleteDishById);
*/

export default router;
