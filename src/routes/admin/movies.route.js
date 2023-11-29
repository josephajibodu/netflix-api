const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const Database = require("../../database/db");
const MovieController = require("../../controllers/movie.controller");

// Movie Schema
// - title
// - description
// - release_year
// - genres
// - duration
// - casts (list of users)
// - director (a user)

router.get("/", MovieController.index);

router.get("/:id", MovieController.show);

router.post("/", MovieController.create);

router.put("/:id", MovieController.update);

router.delete("/:id", MovieController.delete);

module.exports = router;