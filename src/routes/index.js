const authRoute = require("./auth.route");
const actorsRoute = require("./admin/actors.route");
const genresRoute = require("./admin/genres.route");
const moviesRoute = require("./admin/movies.route");
const express = require("express");
const IsAuthenticated = require("../middlewares/IsAuthenticated");
const IsAdmin = require("../middlewares/IsAdmin")
const router = express.Router();

router.use('/admin/auth', authRoute)
router.use("/admin/users", IsAuthenticated, IsAdmin, actorsRoute);
router.use("/admin/genres", IsAuthenticated, IsAdmin, genresRoute);
router.use('/admin/movies', IsAuthenticated, IsAdmin, moviesRoute)

module.exports = router