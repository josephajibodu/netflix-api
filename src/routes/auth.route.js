
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller')
const IsAuthenticated = require('../middlewares/IsAuthenticated');
const { default: rateLimit } = require('express-rate-limit');

const SECONDS_PER_MIN = 60
const MILLISECONDS_PER_SEC = 1000
const loginLimiter = rateLimit({
  windowMs: 1 * SECONDS_PER_MIN * MILLISECONDS_PER_SEC, // 1 minutes window
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    status: false,
    message: "Too many login attempts, please try again later.",
  },
});

router.post('/login', loginLimiter, AuthController.login);

router.delete('/logout', IsAuthenticated, AuthController.logout);

router.post('/register', AuthController.register);

module.exports = router;