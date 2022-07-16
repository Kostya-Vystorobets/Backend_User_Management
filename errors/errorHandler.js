const AppError = require("./applicationError");

const errorHandler = (response, error) => {
  if (error instanceof AppError) {
    response.status(error.status).send({ message: error.message });
    return;
  }
  response.status(500).send({
    success: false,
    massage: error.message ? error.massage : error,
  });
};

module.exports = {
  errorHandler,
};
