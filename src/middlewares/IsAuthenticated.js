const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");
const configs = require("../configs");

module.exports = function (req, res, next) {
    // we extract the bearer token
    // if it doesn't exist we return 401
    const authorization = req.headers.authorization;
    if (! authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            status: false, message: "Unauthenticated"
        })
    }

    const token = authorization.split(" ")[1];

    // we verify the token
    try {
        jwt.verify(token, configs.jwt_key);
    } catch (e) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            status: false, message: "Invalid authorization token"
        })
    }

    next();
}