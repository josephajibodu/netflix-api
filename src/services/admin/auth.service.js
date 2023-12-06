const Admin = require("../../models/User");
const {StatusCodes} = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configs = require("../../configs");

class AuthService {
    static async login(data) {
        const admin = await Admin.findOne({ email: data.email });
        if (! admin) {
            throw new Error("There is user with such credentials.");
        }

        // verify if the password is equal
        const isAMatch = await bcrypt.compare(data.password, admin.password);
        if (! isAMatch) {
            throw new Error("Password is incorrect.");
        }

        return jwt.sign({
            _id: admin._id,
            email: admin.email,
            full_name: admin.full_name,
        }, configs.jwt_key, { expiresIn: '1d'});
    }

    static async register(data) {
        const admin = await Admin.findOne({ email: data.email });
        if (admin) {
            throw new Error("Admin/User with the same email already exist");
        }

        const passwordHash = await bcrypt.hash(data.password, 10);

        const newUser = new Admin(data);
        newUser.role = 'admin';
        newUser.password = passwordHash

        await newUser.save();

        return newUser;
    }

    static logout() {

    }
}

module.exports = AuthService