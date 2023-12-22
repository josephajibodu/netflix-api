const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configs = require("../configs");
const Exception = require("../exceptions/Exception");

class AuthService {
    static async login(data) {
        const admin = await User.findOne({ email: data.email });
        if (! admin) {
            throw new Exception("There is user with such credentials.", StatusCodes.BAD_REQUEST);
        }

        // verify if the password is equal
        const isAMatch = await bcrypt.compare(data.password, admin.password);
        if (! isAMatch) {
            throw new Exception("Password is incorrect.", StatusCodes.BAD_REQUEST);
        }

        const token = jwt.sign({
            _id: admin._id,
            email: admin.email,
            full_name: admin.full_name,
        }, configs.jwt_key, { expiresIn: '24h'});

        // update the token in the db
        admin.token = token;
        admin.save();

        return token;
    }

    static async register(data) {
        const admin = await User.findOne({ email: data.email });
        if (admin) {
            throw new Exception(
              "User with the same email already exist",
              StatusCodes.BAD_REQUEST
            );
        }

        const passwordHash = await bcrypt.hash(data.password, 10);

        const newUser = new User(data);
        newUser.role = 'admin';
        newUser.password = passwordHash

        await newUser.save();

        return newUser;
    }

    static async logout(user_id) {
        const admin = await User.findOne({ _id: user_id });
        if (!admin) {
            throw new Exception(
              "Invalid authentication token.",
              StatusCodes.UNAUTHORIZED
            );
        }
        admin.token = null;
        admin.save();
    }

    static async validateToken(user_id, token) {
        const admin = await User.findOne({ _id: user_id });
        if (!admin) {
          throw new Exception("Invalid authentication token.", StatusCodes.UNAUTHORIZED);
        }

        if (admin.token != token) {
            throw new Error(
              "Invalid authentication token.",
              StatusCodes.UNAUTHORIZED
            );
        }
    }
}

module.exports = AuthService