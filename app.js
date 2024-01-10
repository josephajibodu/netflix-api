const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const registerRoutes = require("./src/setups/routes");
const registerMiddlewares = require("./src/setups/middlewares");
const initializeApp = require("./src/setups/init");
const ErrorHandler = require("./src/middlewares/ErrorHandler");
const helmet = require("helmet");

// app.use(helmet());

app.get('/', function (req, res) {
    res.json({
        message: "Netflix API 1.0"
    })
})

initializeApp(app);

registerMiddlewares(app);

registerRoutes(app);

// TODO: error handler
// it has been moved to middlewares folder
// function errorHandler(err, req, res, next) {
//   // check the kind of error 401, 404, 400, 500
//   res.status(StatusCodes.BAD_REQUEST).json({ status: false, error: e.message });
// }

app.use(ErrorHandler);
