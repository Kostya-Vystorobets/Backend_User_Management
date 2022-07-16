const Joi = require("joi");
const AppError = require("../errors/applicationError");

const validUserCreate = async (data) => {
  try {
    const schema = Joi.object({
      userName: Joi.string().required(),
      password: Joi.string().required(),
      bossId: Joi.string().required(),
    });
    await schema.validateAsync(data);
  } catch (error) {
    throw new AppError(error.details[0].message, 404);
  }
};

const validUserUpdete = async (data) => {
  try {
    const schema = Joi.object({
      userName: Joi.string().required(),
    });
    await schema.validateAsync(data);
  } catch (error) {
    throw new AppError(error.details[0].message, 404);
  }
};

module.exports = { validUserCreate, validUserUpdete };
