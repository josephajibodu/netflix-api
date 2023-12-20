const express = require("express");
const router = express.Router();
const MovieController = require("../../controllers/admin/movie.controller");
const validator = require("../../validators");


router.get("/", MovieController.index);

router.get("/:id", MovieController.show);

router.post("/", validator.createMovieValidation(), validator.validate(), MovieController.create);

router.put("/:id", MovieController.update);

router.delete("/:id", MovieController.delete);

module.exports = router;