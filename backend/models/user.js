const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Введите корректный email'],
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

userSchema.path('avatar').validate((val) => {
  const urlRegex = /((http|ftp|https):\/\/)?(([\w.-]*)\.([\w]*))/;
  return urlRegex.test(val);
}, 'Invalid URL.');

module.exports = mongoose.model('user', userSchema);
