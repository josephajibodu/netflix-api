// routes
const baseRoute = require("../routes");
const v1Route = require("../routes/v1");

module.exports = function registerRoutes(app) {
    app.use('/', baseRoute)
    // app.use('/v1', v1Route)
}

