// routes
const usersRoute = require("../routes/admin/users.route");
const genresRoute = require("../routes/admin/genres.route");
const moviesRoute = require("../routes/admin/movies.route");

module.exports = function registerRoutes(app) {
    app.use('/users', usersRoute)
    app.use('/genres', genresRoute)
    app.use('/movies', moviesRoute)
}

