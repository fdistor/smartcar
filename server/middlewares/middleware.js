const app = require('express')();
const { combinedLogger } = require('../../logger/winston.js');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(combinedLogger);

module.exports = app;
