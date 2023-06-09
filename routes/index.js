const router = require('express').Router();

const { register, login } = require('../controllers/users');
const { validateRegisterInfo, validateLoginInfo } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/not-found-error');
const { PAGE_NOT_FOUND_MESSAGE } = require('../utils/constants');

router.post('/signup', validateRegisterInfo, register);
router.post('/signin', validateLoginInfo, login);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use((_req, _res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND_MESSAGE));
});

module.exports = router;
