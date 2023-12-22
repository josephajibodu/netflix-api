const { body } = require("express-validator");

function createMovieValidation() {
  return [
    body("title")
      .notEmpty()
      .withMessage("title is required")
      .isString()
      .withMessage("must be a string")
      .isLength({ min: 5, max: 100 })
      .withMessage("title should contain 5-100 characters"),
    body("description").notEmpty().isLength({ min: 20 }),
    body("release_year").notEmpty().isDate(),
    body("genres").isArray({ min: 1 }),
    body("duration").isNumeric(),
    body("casts").isArray(),
    body("director").notEmpty()
  ];
}

function updateMovieValidation() {
  return [
    body("description").notEmpty().isLength({ min: 20 }),
    body("genres").isArray({ min: 1 }),
    body("casts").isArray(),
  ];
}

module.exports = {
  updateMovieValidation,
  createMovieValidation
}
