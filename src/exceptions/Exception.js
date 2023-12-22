const { StatusCodes } = require("http-status-codes");

class Exception extends Error {
  constructor(message, code = StatusCodes.INTERNAL_SERVER_ERROR, data = null) {
    super(message);
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

module.exports = Exception