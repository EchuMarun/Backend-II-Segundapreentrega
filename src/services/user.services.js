import userRepository from '../persistence/user.repository.js';
import { createToken } from '../utils/jwt.js';
const loginUser = async user => {
  try {
    const token = createToken(user);
    return token;
  } catch (error) {
    throw error;
  }
};

const findUser = async queries => {
  return await userRepository.findUser(queries);
};

const addUser = async user => {
  return await userRepository.addUser(user);
};

export default {
  loginUser,
  findUser,
  addUser,
};
