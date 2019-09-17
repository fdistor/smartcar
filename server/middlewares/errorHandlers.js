const app = require('./routes.js');
const { errorLogger } = require('../../logger/winston.js');

app.use(errorLogger);
app.use((error, req, res, next) => {
  console.error(error, 'Promise failed (assuming from GM API).');
  res.status(502).send({ message: 'Failed to fetch from GM API.' });
  next(error);
});

module.exports = app;
