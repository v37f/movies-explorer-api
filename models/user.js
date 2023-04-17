const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле `email` является обязательным'],
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'Поле `email` должно быть валидным email-адресом',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле `password` является обязательным'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле `name` является обязательным'],
    minlength: [2, 'Минимальная длина поля `name` 2 символа'],
    maxlength: [30, 'Максимальная длина поля `name` 30 символов'],
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
