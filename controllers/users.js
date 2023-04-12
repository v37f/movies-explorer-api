const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { Error } = require('mongoose');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const ConflictError = require('../errors/conflict-error');
const { JWT_SECRET } = require('../config');
const { removePassword } = require('../utils/utils');
const User = require('../models/user');

// POST /signup
module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((passwordHash) => User.create({
      email,
      password: passwordHash,
      name,
    }))
    .then((user) => {
      res.status(201).send(removePassword(user));
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequestError(err.errors[Object.keys(err.errors)[0]].message));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
        return;
      }
      next(err);
    });
};

// POST /signin
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User
    .findOne({ email }).select('+password')
    .orFail(() => { throw new UnauthorizedError('Неправильная почта или пароль'); })
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        return user;
      }
      throw new UnauthorizedError('Неправильная почта или пароль');
    }))
    .then((user) => {
      const jwt = jsonwebtoken.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ user: removePassword(user), token: jwt });
    })
    .catch(next);
};

// GET /users/me
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequestError(
          'ID пользователя должен содержать только латинские буквы[a-f] и цифры, а также иметь длину 24 символа',
        ));
        return;
      }
      next(err);
    });
};

// PATCH /users/me
module.exports.updateCurrentUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequestError(err.errors[Object.keys(err.errors)[0]].message));
        return;
      }
      next(err);
    });
};
