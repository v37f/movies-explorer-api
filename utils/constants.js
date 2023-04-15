const URL_PATTERN = /https?:\/\/[a-z0-9-]+\.[a-z0-9]{2,}\/?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]*/;

const INTERNAL_SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
const PAGE_NOT_FOUND_MESSAGE = 'Страница не найдена';

const MOVIE_NOT_FOUND_MESSAGE = 'Фильм не найден';
const MOVIE_DELETE_FORBIDDEN_MESSAGE = 'Нельзя удалить чужой сохранённый фильм';
const MOVIE_DELETE_SUCCESS_MESSAGE = 'Фильм удалён из сохранённых';
const MOVIE_INVALID_ID_MESSAGE = 'ID фильма должен содержать только латинские буквы[a-f] и цифры, а также иметь длину 24 символа';

const USER_ALREADY_EXIST_MESSAGE = 'Пользователь с таким email уже существует';
const USER_WRONG_AUTH_DATA_MESSAGE = 'Неправильная почта или пароль';
const USER_NOT_FOUND_MESSAGE = 'Пользователь не найден';
const USER_INVALID_ID_MESSAGE = 'ID пользователя должен содержать только латинские буквы[a-f] и цифры, а также иметь длину 24 символа';

module.exports = {
  URL_PATTERN,
  INTERNAL_SERVER_ERROR_MESSAGE,
  PAGE_NOT_FOUND_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  MOVIE_DELETE_FORBIDDEN_MESSAGE,
  MOVIE_DELETE_SUCCESS_MESSAGE,
  MOVIE_INVALID_ID_MESSAGE,
  USER_ALREADY_EXIST_MESSAGE,
  USER_WRONG_AUTH_DATA_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  USER_INVALID_ID_MESSAGE,
};
