const jwt = require("jsonwebtoken");
const AppError = require("../errors/applicationError");

const verifyAuth = (request, response, next) => {
  try {
    if (request.path === "/api/v1/users/login") {
      next();
    } else {
      const bearerToken = request.headers.authorization;
      const token = bearerToken.slice(7);
      if (token) {
        const decoded = jwt.verify(token, process.env.jwt_key);
        request.userInfo = decoded;
        next();
      } else {
        throw new AppError("Access denied. Token not provided", 401);
      }
    }
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
};

module.exports = {
  verifyAuth,
};
