import bcrypt from 'bcrypt';

export const hashPassword = password => {
  const newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return newPassword;
};

export const comparePassword = (userPassword, password) => {
  return bcrypt.compareSync(password, userPassword);
};
