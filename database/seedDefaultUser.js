const crypto = require("crypto");
const User = require("../models/User");
const ROLE = require("../config/roles_list");
const service = require("../services/user");

async function getKey(byteSize) {
  let key = await crypto.randomBytes(byteSize);
  return key;
}

const createDefaultUser = async (next) => {
  try {
    const userName = "Admin";
    const password = await getKey(12);
    const role = ROLE.Admin;
    const data = {
      userName: userName,
      password: password.toString("hex"),
      role: role,
    };
    await service.create(data);
    console.log("Default User was created.");
    return data;
  } catch (error) {
    next(error);
  }
};

const checkUserExist = async (next) => {
  try {
    const userCount = await User.find().count();
    if (userCount === 0) {
      const user = await createDefaultUser();
      console.log(`userName: ${user.userName}`);
      console.log(`password: ${user.password}`);
      console.log(`role: ${user.role}`);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { checkUserExist };
