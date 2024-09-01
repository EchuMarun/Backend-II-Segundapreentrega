import { userModel } from './models/user.model.js';

const getAllUsers = async () => {
  const users = await userModel.find();
  return users;
};

const findUser = async query => {
  const user = await userModel.findOne(query);
  return user;
};

const addUser = async data => {
  const newUser = await userModel.create(data);
  return newUser;
};

const updateUser = async (id, data) => {
  const updatedUser = await userModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedUser;
};

const deleteUser = async id => {
  await userModel.findByIdAndDelete(id);
  return { msg: 'user deleted' };
};

export default {
  getAllUsers,
  findUser,
  addUser,
  updateUser,
  deleteUser,
};
