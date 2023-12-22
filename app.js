const dotenv = require('dotenv')
dotenv.config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const registerRoutes = require('./src/setups/routes')
const registerMiddlewares = require('./src/setups/middlewares')
const initializeApp = require('./src/setups/init')

initializeApp(app)

registerMiddlewares(app)

registerRoutes(app)


// TODO: error handler
function errorHandler(err, req, res, next) {
  // check the kind of error 401, 404, 400, 500
  res.status(StatusCodes.BAD_REQUEST).json({ status: false, error: e.message });
}

app.use(errorHandler)