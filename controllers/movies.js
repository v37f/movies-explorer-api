const { Error } = require('mongoose');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const {
  MOVIE_NOT_FOUND_MESSAGE,
  MOVIE_DELETE_FORBIDDEN_MESSAGE,
  MOVIE_DELETE_SUCCESS_MESSAGE,
  MOVIE_INVALID_ID_MESSAGE,
} = require('../utils/constants');
const Movie = require('../models/movie');

// GET /movies
module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

// POST /movies
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequestError(err.errors[Object.keys(err.errors)[0]].message));
        return;
      }
      next(err);
    });
};

// DELETE /movies/:movieId
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND_MESSAGE);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(MOVIE_DELETE_FORBIDDEN_MESSAGE);
      }
      return Movie.deleteOne(movie)
        .then(() => res.send({ message: MOVIE_DELETE_SUCCESS_MESSAGE }));
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequestError(MOVIE_INVALID_ID_MESSAGE));
        return;
      }
      next(err);
    });
};
