import mongoose from 'mongoose';

export const connectionMongoDB = async () => {
  try {
    mongoose.connect('mongodb://localhost:27017/ecomerce');
    console.log('conectado a MongoDB');
  } catch (error) {
    console.log(`Error:${error}`);
  }
};
