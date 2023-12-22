const { StatusCodes } = require("http-status-codes");

module.exports = function errorHandler(err, req, res, next) {
  // check the kind of error 401, 404, 400, 500
  res
    .status(StatusCodes.BAD_REQUEST)
    .json({ status: false, error: err.message });
};
