
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller')
const IsAuthenticated = require('../middlewares/IsAuthenticated')

router.post('/login', AuthController.login);

router.delete('/logout', IsAuthenticated, AuthController.logout);

router.post('/register', AuthController.register);

module.exports = router;