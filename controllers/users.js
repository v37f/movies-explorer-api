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
const {
  USER_ALREADY_EXIST_MESSAGE,
  USER_WRONG_AUTH_DATA_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  USER_INVALID_ID_MESSAGE,
} = require('../utils/constants');

// POST /signup
module.exports.register = (req, res, next) => {
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
        next(new ConflictError(USER_ALREADY_EXIST_MESSAGE));
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
    .orFail(() => { throw new UnauthorizedError(USER_WRONG_AUTH_DATA_MESSAGE); })
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        return user;
      }
      throw new UnauthorizedError(USER_WRONG_AUTH_DATA_MESSAGE);
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
    .orFail(() => { throw new NotFoundError(USER_NOT_FOUND_MESSAGE); })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequestError(USER_INVALID_ID_MESSAGE));
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
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequestError(err.errors[Object.keys(err.errors)[0]].message));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError(USER_ALREADY_EXIST_MESSAGE));
        return;
      }
      next(err);
    });
};
