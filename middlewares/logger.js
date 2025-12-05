const winston = require("winston");
const expressWinston = require("express-winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, meta, timestamp }) =>
      `${timestamp} ${level}: ${meta.error?.stack || message}`
  )
);

const rotatingRequestTransport = new DailyRotateFile({
  filename: "request-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "7d",
  zippedArchive: true,
});

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({ format: messageFormat }),
    rotatingRequestTransport,
  ],
});

const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
