// Imports
import mongoose from 'mongoose';

// Schema
const dishSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  preparationSteps: {
    type: [String],
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
});

// Model
const Dish = mongoose.model('Dish', dishSchema);

export default Dish;
