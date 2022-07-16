const mongoose = require("mongoose");
const AppError = require("../errors/applicationError");

const validateId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(`ID: ${id} Invalid.`, 400);
  }
};

module.exports = { validateId };
