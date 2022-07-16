const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
const validate = require("../validations/generalValidation");
const ROLE = require("../config/roles_list");
const AppError = require("../errors/applicationError");

const login = async (request) => {
  const user = await User.findOne({ userName: request.body.userName });
  if (user) {
    const validPassword = await bcrypt.compare(
      request.body.password,
      user.password
    );
    if (validPassword) {
      const token = jwt.sign(
        {
          userName: user.userNameі,
          role: user.role,
          userId: user._id,
        },
        process.env.jwt_key,
        { expiresIn: "1h" }
      );
      return { token: token };
    } else {
      console.log("Password is not correct");
      throw new AppError("Password is not correct", 401);
    }
  } else {
    console.log("User not found");
    throw new AppError("User not found", 404);
  }
};

const create = async (user) => {
  const сheckUserName = await User.findOne({ userName: user.userName });
  if (!сheckUserName) {
    if (user.role !== ROLE.Admin) {
      const сheckUserBoss = await User.findById(user.bossId);
      if (сheckUserBoss) {
        if (сheckUserBoss.role === ROLE.User) {
          await User.findByIdAndUpdate(user.bossId, { role: ROLE.Boss });
        }
      } else {
        throw new AppError("Boss with this ID does not exist.", 404);
      }
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(user.password, salt);
    const newUser = new User({
      userName: user.userName,
      password: hashPassword,
      role: user.role || ROLE.User,
      bossId: user.bossId,
    });
    await newUser.save();
    newUser.password = user.password;
    return newUser;
  } else {
    throw new AppError("The User with this User Name already exists.", 404);
  }
};

const getUsers = async (request) => {
  const user = await User.findById(request.userInfo.userId).select("-password");
  if (user.role === ROLE.Admin) {
    const allUsers = await User.find().select("-password");
    return allUsers;
  }
  if (user.role === ROLE.Boss) {
    const usersByBoss = await User.aggregate([
      { $match: { userName: user.userName } },
      {
        $graphLookup: {
          from: "users",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "bossId",
          maxDepth: 0,
          as: "subordinates",
        },
      },
    ]);
    return usersByBoss;
  }
  return user;
};

const updeteById = async (request) => {
  await validate.validateId(request.params.id);
  const user = await User.findById(request.params.id).select("-password");
  if (request.userInfo.userId === user.bossId.toString()) {
    return await User.findByIdAndUpdate(
      request.params.id,
      {
        userName: request.body.userName,
      },
      {
        new: true,
      }
    );
  }
};

module.exports = {
  login,
  create,
  getUsers,
  updeteById,
};
