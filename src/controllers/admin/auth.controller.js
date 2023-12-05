const Admin = require("../../models/User");
const jwt = require('jsonwebtoken');


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
        // const users = await User.find({});
        // if (!users) {
        //     return res
        //         .status(404)
        //         .json({ status: false, message: "Users not found" });
        // }
        const user = await Admin.findOne();

        const token = jwt.sign({
            _id: user._id,
            email: user.email,
            full_name: user.full_name,
        }, 'secret-password-for-encryption');

        res.json({ status: true, token: token });
    }

    static async logout(req, res) {
        // const user = await User.findById({ _id: req.params.id });
        // if (!user) {
        //     return res.status(404).send({
        //         message: "User not found",
        //     });
        // }

        res.json({ status: true, data: 'logged out' });
    }

    static async register(req, res) {
        // const data = req.body;
        // data.role = 'movie-actor';
        //
        // const user = await User.findOne({ email: data.email });
        // if (user) {
        //     return res.status(400).send("User with the same email already exist");
        // }
        // const newUser = new User(data);
        // await newUser.save();

        res.status(201).json({ status: true, data: 'registered' });
    }
}

module.exports = AuthController;