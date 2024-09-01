import jwt from 'jsonwebtoken';
import envsConfig from '../config/envs.config.js';

export const createToken = user => {
  const { first_name, last_name, email } = user;
  const newUser = { first_name, last_name, email };
  const token = jwt.sign(newUser, envsConfig.JWT_CODE_SECRET, { expiresIn: '2m' });
  return token;
};

export const verifyToken = token => {
  try {
    const decode = jwt.verify(token, envsConfig.JWT_CODE_SECRET);
    return decode;
  } catch (error) {
    return null;
  }
};
