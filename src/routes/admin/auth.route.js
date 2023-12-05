
const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/admin/auth.controller')

router.post('/login', AuthController.login);

router.delete('/logout', AuthController.logout);

router.post('/register', AuthController.register);

module.exports = router;