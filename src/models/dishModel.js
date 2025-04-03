import mongoose from 'mongoose';

const dishSchema = mongoose.Schema(
  {},
);

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;
