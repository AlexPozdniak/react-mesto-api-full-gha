const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = require('../models/user');
const { сreated } = require('../errors/errorCodes');

const { NODE_ENV, JWT_SECRET } = process.env;

const Conflict = require('../errors/conflict');
const NotFound = require('../errors/notFound');
const Unauthorized = require('../errors/unauthorized');
const BadRequest = require('../errors/badRequest');

module.exports.getAllUsers = (req, res, next) => {
  userSchema
    .find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  userSchema
    .findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь по данному _id не найден');
      }
      return res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Неверный id'));
      } else {
        next(error);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  userSchema
    .findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь по данному _id не найден');
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.addUser = (req, res, next) => {
  const {
    name, about, avatar, email, password
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => userSchema
      .create({
        name, about, avatar, email, password: hash
      }))
    .then((user) => res.status(сreated).send({
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return userSchema.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Пользователь не найден');
      }
      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            throw new Unauthorized('Не правильно указан логин или пароль');
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key',
            { expiresIn: '7d' },
          );
          return res.send({ token });
        });
    })
    .catch(next);
};

module.exports.editProfile = (req, res, next) => {
  const id = req.user._id;
  const { name, about } = req.body;

  userSchema.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь по данному _id не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};

module.exports.editAvatar = (req, res, next) => {
  const id = req.user._id;
  const { avatar } = req.body;

  userSchema.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь по данному _id не найден');
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};
