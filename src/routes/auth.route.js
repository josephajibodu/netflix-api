
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller')
const IsAuthenticated = require('../middlewares/IsAuthenticated');
const throttle = require('../middlewares/throttle')

router.post('/login', throttle(5, 1), AuthController.login);

router.delete('/logout', IsAuthenticated, AuthController.logout);

router.post("/register", throttle(1, 1), AuthController.register);

module.exports = router;