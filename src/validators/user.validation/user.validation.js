const { body } = require("express-validator");

function createUserValidation() {
  return [
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("must be a valid email"),
    body("full_name")
      .notEmpty()
      .withMessage("full name is required")
      .isString()
      .isLength({ min: 5 }),
    body("gender").isString({ min: 5 }).notEmpty(),
    body("dob").isDate().notEmpty(),
    body("role").isString(),
    body("password").isString().notEmpty(),
    body("token").isString(),
  ];
}

function updateUserValidation() {
  return [
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("must be a valid email"),
    body("role").isString(),
    body("password").isString().notEmpty(),
  ];
}
module.exports = { createUserValidation, updateUserValidation };
