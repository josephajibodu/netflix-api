const express = require("express");
const router = express.Router();
const MovieController = require("../../controllers/admin/movie.controller");
const validator = require("../../validators/movie.validator");
const asyncHandler = require("express-async-handler");

router.get("/", MovieController.index);

router.get("/:id", asyncHandler(MovieController.show));

router.post(
  "/",
  validator.createMovieValidation(),
  validator.validate(),
  MovieController.create
);

router.put(
  "/:id",
  validator.updateMovieValidation(),
  validator.validate(),
  MovieController.update
);

router.delete("/:id", MovieController.delete);

module.exports = router;
