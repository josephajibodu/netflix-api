const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");
const configs = require("../configs");
const AuthService = require("../services/auth.service");

module.exports = async function (req, res, next) {
    // we extract the bearer token
    // if it doesn't exist we return 401
    const authorization = req.headers.authorization;
    if (! authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            status: false, message: "Unauthenticated"
        })
    }

    const token = authorization.split(" ")[1];

    try {
        // we verify the token
        const userPayload = jwt.verify(token, configs.jwt_key);
        req.user = userPayload;
        
        // check the token in the users database
        await AuthService.validateToken(userPayload._id, token);
    } catch (e) {
        console.log(e.message)
        return res.status(StatusCodes.UNAUTHORIZED).json({
          status: false,
          message: "Not authenticated",
        });
    }

    next();
}