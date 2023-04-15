const jsonwebtoken = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { AUTHORIZATION_REQUIRED_MESSAGE, INVALID_TOKEN_MESSAGE } = require('../utils/constants');
const { JWT_SECRET } = require('../config');

module.exports.auth = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new UnauthorizedError(AUTHORIZATION_REQUIRED_MESSAGE));
    return;
  }
  const jwt = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jsonwebtoken.verify(jwt, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(INVALID_TOKEN_MESSAGE));
    return;
  }

  req.user = payload;
  next();
};
