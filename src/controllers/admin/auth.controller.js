const Admin = require("../../models/User");
const jwt = require('jsonwebtoken');
const {StatusCodes} = require("http-status-codes");
const configs = require('../../configs');
const bcrypt = require('bcrypt');
const AdminAuthService = require('../../services/admin/auth.service')


// SESSION
// send username and pass to server
// server validates it
// server will generate and store a session data for the user
// server will send back session_id to the browser
// browser will save session_id in cookie
// browser will always send along session_id on every request
// server will check its storage for the session_id

// JWT - Json Web Token
// send username and pass to server
// server validates the user
// server will just generate a jwt token for the user (using secret of 'pass')
// server will send it back to the browser
// browser will save session_id in cookie
// browser will always send along jwt token on every request
// server just verifies the token

class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;

        const token = await AdminAuthService.login({ email, password })

        res.json({ status: true, token: token });
    }

    static async logout(req, res) {
        await AdminAuthService.logout();

        res.json({ status: true, data: 'User logged out' });
    }

    static async register(req, res) {
        const data = req.body;

        const user = await AdminAuthService.register(data);

        res.status(201).json({ status: true, data: user });
    }
}

module.exports = AuthController;