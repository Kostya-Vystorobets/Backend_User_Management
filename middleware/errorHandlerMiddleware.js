const { errorHandler } = require("../errors/errorHandler");

const errorHandlerMiddleware = (error, request, response, next) => {
  console.log(error);
  errorHandler(response, error);
};

module.exports = {
  errorHandlerMiddleware,
};
