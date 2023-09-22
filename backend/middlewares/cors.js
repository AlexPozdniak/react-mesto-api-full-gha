const allowedCors = [
  'https://alexpoz.nomoredomainsicu.ru',
  'https://alexpoz.nomoredomainsicu.ru',
  'https://api.alexpoz.nomoredomainsicu.ru/users/me',
  'https://api.alexpoz.nomoredomainsicu.ru/cards',
  'https://api.alexpoz.nomoredomainsicu.ru/signup',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3001',
  'http://localhost:4000',
  'https://158.160.54.232',
  'http://158.160.54.232',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};
