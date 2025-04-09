/* eslint-disable newline-per-chained-call */
const { celebrate, Joi } = require('celebrate');
const { URL_PATTERN } = require('../utils/constants');

module.exports.validateRegisterInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: false }).messages({
      'string.base': 'Поле `email` должно иметь тип `string`',
      'string.empty': 'Поле `email` должно быть заполнено',
      'string.email': 'Поле `email` должно содержать валидный email-адрес',
      'any.required': 'Поле `email` является обязательным',
    }),
    password: Joi.string().required().messages({
      'string.base': 'Поле `password` должно иметь тип `string`',
      'string.empty': 'Поле `password` должно быть заполнено',
      'any.required': 'Поле `password` является обязательным',
    }),
    name: Joi.string().required().min(2).max(30).messages({
      'string.base': 'Поле `name` должно иметь тип `string`',
      'string.empty': 'Поле `name` должно быть заполнено',
      'any.required': 'Поле `name` является обязательным',
      'string.min': 'Поле `name` должно содержать минимум {#limit} символа',
      'string.max': 'Поле `name` должно содержать максимум {#limit} символов',
    }),
  }),
});

module.exports.validateLoginInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: false }).messages({
      'string.base': 'Поле `email` должно иметь тип `string`',
      'string.empty': 'Поле `email` должно быть заполнено',
      'string.email': 'Поле `email` должно содержать валидный email-адрес',
      'any.required': 'Поле `email` является обязательным',
    }),
    password: Joi.string().required().messages({
      'string.base': 'Поле `password` должно иметь тип `string`',
      'string.empty': 'Поле `password` должно быть заполнено',
      'any.required': 'Поле `password` является обязательным',
    }),
  }),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: false }).messages({
      'string.base': 'Поле `email` должно иметь тип `string`',
      'string.empty': 'Поле `email` должно быть заполнено',
      'string.email': 'Поле `email` должно содержать валидный email-адрес',
      'any.required': 'Поле `email` является обязательным',
    }),
    name: Joi.string().required().min(2).max(30).messages({
      'string.base': 'Поле `name` должно иметь тип `string`',
      'string.empty': 'Поле `name` должно быть заполнено',
      'any.required': 'Поле `name` является обязательным',
      'string.min': 'Поле `name` должно содержать минимум {#limit} символа',
      'string.max': 'Поле `name` должно содержать максимум {#limit} символов',
    }),
  }),
});

module.exports.validateMovieInfo = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'string.base': 'Поле `country` должно иметь тип `string`',
      'string.empty': 'Поле `country` должно быть заполнено',
      'any.required': 'Поле `country` является обязательным',
    }),
    director: Joi.string().required().messages({
      'string.base': 'Поле `director` должно иметь тип `string`',
      'string.empty': 'Поле `director` должно быть заполнено',
      'any.required': 'Поле `director` является обязательным',
    }),
    duration: Joi.number().required().messages({
      'number.base': 'Поле `duration` должно иметь тип `number`',
      'any.required': 'Поле `duration` является обязательным',
    }),
    year: Joi.string().required().messages({
      'string.base': 'Поле `year` должно иметь тип `string`',
      'string.empty': 'Поле `year` должно быть заполнено',
      'any.required': 'Поле `year` является обязательным',
    }),
    description: Joi.string().required().messages({
      'string.base': 'Поле `description` должно иметь тип `string`',
      'string.empty': 'Поле `description` должно быть заполнено',
      'any.required': 'Поле `description` является обязательным',
    }),
    image: Joi.string().required().pattern(URL_PATTERN).messages({
      'string.base': 'Поле `image` должно иметь тип `string`',
      'string.pattern.base': 'Поле `image` должно быть валидным URL-адресом',
      'any.required': 'Поле `image` является обязательным',
    }),
    trailerLink: Joi.string().required().pattern(URL_PATTERN).messages({
      'string.base': 'Поле `trailerLink` должно иметь тип `string`',
      'string.pattern.base':
        'Поле `trailerLink` должно быть валидным URL-адресом',
      'any.required': 'Поле `trailerLink` является обязательным',
    }),
    thumbnail: Joi.string().required().pattern(URL_PATTERN).messages({
      'string.base': 'Поле `thumbnail` должно иметь тип `string`',
      'string.pattern.base':
        'Поле `thumbnail` должно быть валидным URL-адресом',
      'any.required': 'Поле `thumbnail` является обязательным',
    }),
    movieId: Joi.number().required().messages({
      'number.base': 'Поле `movieId` должно иметь тип `number`',
      'any.required': 'Поле `movieId` является обязательным',
    }),
    nameRU: Joi.string().required().messages({
      'string.base': 'Поле `nameRU` должно иметь тип `string`',
      'string.empty': 'Поле `nameRU` должно быть заполнено',
      'any.required': 'Поле `nameRU` является обязательным',
    }),
    nameEN: Joi.string().required().messages({
      'string.base': 'Поле `nameEN` должно иметь тип `string`',
      'string.empty': 'Поле `nameEN` должно быть заполнено',
      'any.required': 'Поле `nameEN` является обязательным',
    }),
  }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).messages({
      'string.hex':
        'ID фильма может содержать только латинские буквы[a-f] и цифры',
      'string.length': 'Длина ID фильма должна составлять {#limit} символа',
    }),
  }),
});
