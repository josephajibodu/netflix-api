const paystackConfig = require("./paystack");
const flutterwaveConfig = require("./flutterwave");

const configs = {
    app_name: process.env.APP_NAME,
    app_port: process.env.APP_PORT,
    app_url: process.env.APP_URL,

    database_url: process.env.DATABASE_URL,
    database_name: process.env.DATABASE_NAME,

    ...paystackConfig,

    ...flutterwaveConfig,
}

module.exports = configs;