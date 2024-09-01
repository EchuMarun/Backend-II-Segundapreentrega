import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cart',
  },
  role: {
    type: String,
    default: 'user',
  },
});

export const userModel = new mongoose.model(userCollection, userSchema);
