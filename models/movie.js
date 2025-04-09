const mongoose = require('mongoose');
const { URL_PATTERN } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле `country` является обязательным'],
    },
    director: {
      type: String,
      required: [true, 'Поле `director` является обязательным'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле `duration` является обязательным'],
    },
    year: {
      type: String,
      required: [true, 'Поле `year` является обязательным'],
    },
    description: {
      type: String,
      required: [true, 'Поле `description` является обязательным'],
    },
    image: {
      type: String,
      required: [true, 'Поле `image` является обязательным'],
      validate: {
        validator(value) {
          return URL_PATTERN.test(value);
        },
        message: 'Поле `image` должно быть валидным URL-адресом',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Поле `trailerLink` является обязательным'],
      validate: {
        validator(value) {
          return URL_PATTERN.test(value);
        },
        message: 'Поле `trailerLink` должно быть валидным URL-адресом',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле `thumbnail` является обязательным'],
      validate: {
        validator(value) {
          return URL_PATTERN.test(value);
        },
        message: 'Поле `thumbnail` должно быть валидным URL-адресом',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: [true, 'Поле `movieId` является обязательным'],
    },
    nameRU: {
      type: String,
      required: [true, 'Поле `nameRU` является обязательным'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле `nameEN` является обязательным'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
