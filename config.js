require('dotenv').config();

const { NODE_ENV } = process.env;
const { JWT_SECRET_PRODUCTION } = process.env;
const { PORT = '3001' } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { ORIGIN = 'localhost:3000' } = process.env;
const { API_PREFIX = '' } = process.env;

const JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET_PRODUCTION : 'dev-secret';

module.exports = {
  JWT_SECRET,
  PORT,
  DB_ADDRESS,
  ORIGIN,
  API_PREFIX,
};
