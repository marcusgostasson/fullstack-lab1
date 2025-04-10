// Imports
import mongoose from 'mongoose';


const dishSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true
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
  servings: {
    type: Number,
    required: true,
  }
});

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;

