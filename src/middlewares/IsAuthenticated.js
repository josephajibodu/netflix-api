const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");
const configs = require("../configs");
const AuthService = require("../services/auth.service");
const Exception = require("../exceptions/Exception");

module.exports = async function (req, res, next) {
    try {
      // we extract the bearer token
      // if it doesn't exist we return 401
      const authorization = req.headers.authorization;
      if (!authorization) {
        throw new Exception("Unauthenticated", StatusCodes.UNAUTHORIZED);
      }

      const token = authorization.split(" ")[1];

      // we verify the token
      const userPayload = jwt.verify(token, configs.jwt_key);
      req.user = userPayload;

      // check the token in the users database
      await AuthService.validateToken(userPayload._id, token);
    } catch (e) {
        let error = e;
        if (e instanceof jwt.JsonWebTokenError) {
            error = new Exception("Invalid Authentication token", StatusCodes.BAD_REQUEST)
        }
        
        next(error);
    }

    next();
}