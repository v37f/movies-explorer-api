const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 300,
});

module.exports = limiter;
