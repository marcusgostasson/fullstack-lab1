import Dish from '../models/dishModel.js';

// GET all dishes
export const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json(dishes);
  } catch {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// GET dish by name
export const getDishByName = async (req, res) => {
  try {
    const { name } = req.params;
    const dish = await Dish.findOne({ name: name });
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found with that name' });
    }
    res.status(200).json(dish);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// POST dish
export const postDish = async (req, res) => {
  try {
    const { name, ingredients, preparationSteps,
            cookingTime , origin, servings} = req.body;

    const existingDish = await Dish.findOne({ name });
    if (existingDish) {
      return res.status(409).json({ message: 'A dish with that name already exists' });
    }

    const allDishes = await Dish.find().sort({ id: -1 });
    const nextId = allDishes.length > 0 ? allDishes[0].id + 1 : 1;

    req.body.id = nextId;

    const newDish = new Dish(req.body);
    console.log(newDish)
    const savedDish = await newDish.save();
    res.status(201).json(savedDish);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};

// PUT dish by id
export const putDishById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDish = await Dish.findByIdAndUpdate(id, req.body, {});
    if (!updatedDish) {
      return res
        .status(404)
        .json({ message: 'No dish with that name was not found' });
    }
    res.status(200).json(updatedDish);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update dish' });
  }
};

// DELETE dish by id
export const deleteDishById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDish = await Dish.findOneAndDelete({ id: req.params.id });
    if (!deletedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json({ message: 'Dish deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete dish' });
  }
};
