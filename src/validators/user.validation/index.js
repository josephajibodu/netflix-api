const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const userValidation = require("./user.validation");

function validate() {
  return function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const outputErrors = {};
      errors
        .array()
        .reverse()
        .forEach((error) => {
          outputErrors[error.path] = [
            ...(outputErrors[error.path] ?? []),
            error.msg,
          ];
        });
      const outputMessage = `${Object.keys(outputErrors)[0]} - ${
        outputErrors[Object.keys(outputErrors)[0]][0]
      } (and other errors)`;

      return res.status(StatusCodes.BAD_REQUEST).send({
        message: outputMessage,
        errors: outputErrors,
      });
    }
    next();
  };
}
module.exports = { ...userValidation, validate };
