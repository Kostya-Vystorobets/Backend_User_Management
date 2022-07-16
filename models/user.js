const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: Number,
    require: true,
  },
  bossId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
});

module.exports = mongoose.model("users", userSchema);
