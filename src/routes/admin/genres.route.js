const express = require("express");
const router = express.Router();
const GenreController = require("../../controllers/admin/genre.controller");
const validator = require("../../validators/genre.validator");

router.get("/", GenreController.index);

router.post(
  "/",
  validator.createGenreValidation(),
  validator.validate(),
  GenreController.create
);

router.put(
  "/:id",
  validator.updateGenreValidation(),
  validator.validate(),
  GenreController.update
);

router.delete("/:id", GenreController.delete);

module.exports = router;
