require('dotenv').config();

const app = require('express')();
const router = require('./router.js');
const bodyParser = require('body-parser');
const { combinedLogger, errorLogger } = require('../logger/winston.js');
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(combinedLogger);

app.get('/vehicles/:id', router.getVehicleInfo);
app.get('/vehicles/:id/doors', router.getSecurity);
app.get('/vehicles/:id/fuel', router.getFuel);
app.get('/vehicles/:id/battery', router.getBattery);
app.post('/vehicles/:id/engine', router.postEngine);
app.get('/error', router.throwError);

app.use(errorLogger);

app.use((error, req, res, next) => {
  console.error(error, 'Promise failed (assuming from GM API).');
  res.status(502).send({ message: 'Failed to fetch from GM API.' });
  next(error);
});

app.listen(port, err => {
  if (err) console.error(err);
  console.log(`Listening on http://localhost:${port}`);
});
