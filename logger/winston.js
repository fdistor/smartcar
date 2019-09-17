const { transports, format } = require('winston');
const expressWinston = require('express-winston');

const combinedOptions = {
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/combined.log' })
  ],
  format: format.combine(
    format.colorize(),
    format.json(),
    format.prettyPrint()
  ),
  colorize: true
};

const errorOptions = {
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' })
  ],
  format: format.combine(format.colorize(), format.json(), format.prettyPrint())
};

const combinedLogger = expressWinston.logger(combinedOptions);
const errorLogger = expressWinston.errorLogger(errorOptions);

module.exports = {
  combinedLogger,
  errorLogger
};
