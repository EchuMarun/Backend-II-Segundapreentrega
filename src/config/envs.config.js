import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT,
  CODE_SECRET: process.env.CODE_SECRET,
  JWT_CODE_SECRET: process.env.JWT_CODE_SECRET,
  MONGODB_URL: process.env.MONGODB_URL,
};
