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
    const {
      name,
      ingredients,
      preparationSteps,
      cookingTime,
      difficulty,
      origin,
      servings,
    } = req.body;

    const existingDish = await Dish.findOne({ name });
    if (existingDish) {
      return res
        .status(409)
        .json({ message: 'A dish with that name already exists' });
    }

    const newDish = new Dish(req.body);
    const savedDish = await newDish.save();
    res.status(201).json(savedDish);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong', error: err.message });
  }
};

// PUT a dish to database
export const putDishById = async (req, res) => {
  const { id } = req.params;

  const dish = await Dish.findById(id);

  if (!dish) {
    return res.status(404).json({ message: 'Dish not found' });
  }

  const { oldIngredient, newIngredient, oldStep, newStep } = req.body;

  // Change ingredient
  if (oldIngredient && newIngredient) {
    const index = dish.ingredients.indexOf(oldIngredient);
    if (index !== -1) {
      dish.ingredients[index] = newIngredient;
    } else {
      return res.status(404).json({ message: 'Ingredient not found' });
    }
  }

  // Change step
  if (oldStep && newStep) {
    const stepIndex = dish.preparationSteps.indexOf(oldStep);
    if (stepIndex !== -1) {
      dish.preparationSteps[stepIndex] = newStep;
    } else {
      return res.status(404).json({ message: 'Step not found' });
    }
  }

  await dish.save();
  res.status(200).json(dish);
};

// DELETE dish by id
export const deleteDishById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDish = await Dish.findByIdAndDelete(req.params.id);
    if (!deletedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json({ message: 'Dish deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete dish' });
  }
};
