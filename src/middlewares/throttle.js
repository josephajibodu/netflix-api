const rateLimit = require("express-rate-limit");

const SECONDS_PER_MIN = 60
const MILLISECONDS_PER_SEC = 1000

module.exports = function (numberOfReq, intervalInMinute) {
    return rateLimit({
      windowMs: intervalInMinute * SECONDS_PER_MIN * MILLISECONDS_PER_SEC, // 1 minutes window
      max: numberOfReq, // limit each IP to 5 requests per windowMs
      message: {
        status: false,
        message: "Too many login attempts, please try again later.",
      },
    });
}