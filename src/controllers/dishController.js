import Dish from '../models/dishModel.js';

export const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json(dishes);
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

/*
export const getDishByName = async (req, res) => {}
export const postDish = async (req, res) => {}
export const putDishById = async (req, res) => {}
export const deleteDishById = async (req, res) => {}
*/
