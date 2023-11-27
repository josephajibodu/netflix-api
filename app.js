const express = require('express');
const app = express();
const dotenv = require('dotenv')
const registerRoutes = require('./setups/routes')
const registerMiddlewares = require('./setups/middlewares')
const initializeApp = require('./setups/init')

// this will load the variables in .env file into node process.env
dotenv.config()

initializeApp(app)

registerMiddlewares(app)

registerRoutes(app)

// TODO: error handler
