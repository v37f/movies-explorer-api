const { INTERNAL_SERVER_ERROR_MESSAGE } = require('../utils/constants');

module.exports.errorHandler = (err, _req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? INTERNAL_SERVER_ERROR_MESSAGE : message,
  });
  next();
};
