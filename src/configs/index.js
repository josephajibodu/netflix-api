const paystackConfig = require("./paystack");
const flutterwaveConfig = require("./flutterwave");
const telegramConfig = require("./telegram");
const slackConfig = require("./slack");

const configs = {
  app_name: process.env.APP_NAME,
  app_port: process.env.APP_PORT,
  app_url: process.env.APP_URL,

  database_url: process.env.DATABASE_URL,
  database_name: process.env.DATABASE_NAME,

  jwt_key: process.env.JWT_SECRET,

  ...paystackConfig,

  ...flutterwaveConfig,

  telegram: telegramConfig,
  slack: slackConfig,
};

module.exports = configs;