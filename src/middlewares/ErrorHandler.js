const { StatusCodes } = require("http-status-codes");
const Exception = require("../exceptions/Exception");
const logger = require("../libs/logger");

module.exports = function errorHandler(err, req, res, next) {
    if (err instanceof Exception) {
        return res
            .status(err.code)
            .json({ status: false, message: err.message, error: err.data });
    }
  
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: err.message });
};
