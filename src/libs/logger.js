const winston = require("winston");
const TelegramLogger = require("winston-telegram");
const configs = require("../configs");
const SlackHook = require("winston-slack-webhook-transport");

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
      filename: "logs/combined.log",
      level: "info",
    }),
    // new TelegramLogger({
    //   token: configs.telegram.token,
    //   chatId: configs.telegram.chat_id,
    //   level: 'error',
    // }),
    // new SlackHook({
    //   webhookUrl: configs.slack.webhook_url,
    // }),
  ],
});

module.exports = logger;
