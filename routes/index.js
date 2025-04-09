const router = require('express').Router();

const { register, login } = require('../controllers/users');
const {
  validateRegisterInfo,
  validateLoginInfo,
} = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/not-found-error');
const { PAGE_NOT_FOUND_MESSAGE } = require('../utils/constants');
const { API_PREFIX } = require('../config');

router.post(`${API_PREFIX}/signup`, validateRegisterInfo, register);
router.post(`${API_PREFIX}/signin`, validateLoginInfo, login);
router.use(auth);
router.use(`${API_PREFIX}/users`, userRouter);
router.use(`${API_PREFIX}/movies`, movieRouter);
router.use((_req, _res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND_MESSAGE));
});

module.exports = router;
