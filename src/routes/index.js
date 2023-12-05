const authRoute = require("./admin/auth.route");
const actorsRoute = require("./admin/actors.route");
const genresRoute = require("./admin/genres.route");
const moviesRoute = require("./admin/movies.route");
const express = require("express");
const router = express.Router();

router.use('/admin/auth', authRoute)
router.use('/admin/users', actorsRoute)
router.use('/admin/genres', genresRoute)
router.use('/admin/movies', moviesRoute)

module.exports = router