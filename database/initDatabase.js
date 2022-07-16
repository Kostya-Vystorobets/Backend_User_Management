const mongoose = require("mongoose");
const { checkUserExist } = require("./seedDefaultUser");
require("dotenv").config();

const initDatabase = async () => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log("Connected to MongoDB.");
    await checkUserExist();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  initDatabase,
};
