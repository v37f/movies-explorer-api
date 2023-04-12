const router = require('express').Router();

const { createUser, login } = require('../controllers/users');
// const { validateAuthInfo } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/not-found-error');

router.post('/signup', /* validateAuthInfo, */ createUser);
router.post('/signin', /* validateAuthInfo, */ login);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use((_req, _res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
