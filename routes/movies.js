const router = require('express').Router();
// const { validateMovieInfo, validateMovieId } = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', /* validateMovieInfo, */ createMovie);

router.delete('/:cardId', /* validateMovieId, */ deleteMovie);

module.exports = router;
