const winston = require("winston");

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    myFormat
  ),
  transports: [
    new winston.transports.Console({
      level: "debug",
    }),
    new winston.transports.File({
        filename: 'logs/combined.log',
        level: 'info'
    })
  ],
});

module.exports = logger;
