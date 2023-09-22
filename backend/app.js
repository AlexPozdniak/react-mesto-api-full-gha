require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./routes');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const defaultErr = require('./errors/defaultErr');
const NotFound = require('./errors/notFound');
const { login, addUser } = require('./controllers/users');
const { REGEXP } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(helmet());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      })
      .unknown(true),
  }),
  login
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().regex(REGEXP),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      })
      .unknown(true),
  }),
  addUser
);

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => {
  next(new NotFound('Порта не существует'));
});

app.use(defaultErr);

app.listen(3000, () => {
  console.log('server started on port 3000');
});
