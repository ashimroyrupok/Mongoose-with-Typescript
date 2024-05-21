import dotenv from 'dotenv';

dotenv.config();

export default {
  db_uri: process.env.MONGODB_URI,
  port: process.env.PORT
};