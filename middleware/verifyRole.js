const AppError = require("../errors/applicationError");

const verifyRole = (...allRoles) => {
  return (request, response, next) => {
    const rolesArray = [...allRoles];
    const result = rolesArray.filter((role) => role === request.userInfo.role);
    console.log(rolesArray);
    console.log(request.userInfo.role);
    console.log(result);
    if (result.length > 0) {
      next();
    } else {
      throw new AppError("Access denied. No access rights", 401);
    }
  };
};

module.exports = {
  verifyRole,
};
