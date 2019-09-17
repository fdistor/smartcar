const app = require('./routes.js');
const { errorLogger } = require('../../logger/winston.js');

app.use(errorLogger);

app.use((error, req, res, next) => {
  if (error.message === '1')
    res
      .status(502)
      .send({ message: 'Bad gateway, failed to fetch from upstream server.' });
  next(error);
});

app.use((error, req, res, next) => {
  if (error.message === '0')
    res.status(500).send({ message: 'Internal server error.' });
  next(error);
});

module.exports = app;
