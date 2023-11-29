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