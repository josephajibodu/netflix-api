const Admin = require("../../models/User");
const jwt = require('jsonwebtoken');
const {StatusCodes} = require("http-status-codes");
const configs = require('../../configs');
const bcrypt = require('bcrypt');


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

        const admin = await Admin.findOne({ email: email });
        if (! admin) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ status: false, message: "There is user with such credentials." });
        }

        // verify if the password is equal
        const isAMatch = await bcrypt.compare(password, admin.password);
        if (! isAMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ status: false, message: "Password is incorrect." });
        }

        const token = jwt.sign({
            _id: admin._id,
            email: admin.email,
            full_name: admin.full_name,
        }, configs.jwt_key, { expiresIn: '1d'});

        res.json({ status: true, token: token, refreshToken: token });
    }

    static async logout(req, res) {

        // const user = await User.findById({ _id: req.params.id });
        // if (!user) {
        //     return res.status(404).send({
        //         message: "User not found",
        //     });
        // }

        res.json({ status: true, data: 'User logged out' });
    }

    static async register(req, res) {
        const data = req.body;

        const admin = await Admin.findOne({ email: data.email });
        if (admin) {
            return res.status(400).send("Admin/User with the same email already exist");
        }

        const passwordHash = await bcrypt.hash(data.password, 10);

        const newUser = new Admin(data);
        newUser.role = 'admin';
        newUser.password = passwordHash

        await newUser.save();

        res.status(201).json({ status: true, data: 'registered' });
    }
}

module.exports = AuthController;