import { userDTO } from '../dto/user.dto.js';
import userServices from '../services/user.services.js';

const registerUser = async (req, res) => {
  const newUser = userDTO(req.user);
  res.status(201).json({ status: 'success', message: newUser });
};

const loginUser = async (req, res) => {
  try {
    const newUser = userDTO(req.user);
    const token = await userServices.loginUser(req.user);
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ status: 'success', payload: newUser, token });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'internal server error' });
  }
};

const current = async (req, res) => {
  const resUserDTO = userDTO(req.user);
  res.status(200).json({ status: 'success', payload: resUserDTO });
};

export default {
  registerUser,
  loginUser,
  current,
};
