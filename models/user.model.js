const { mongoose } = require("../database/mongo.conn");
const { getCurrentTimeStamp } = require("../services/common.service");
const { roleType} = require("../utils/constants.utils");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    allowNull: false,
  },
  emailId: {
    type: String,
    required: true,
    allowNull: false,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    allowNull: false,
    unique: true,
  },
  role: {
    type: String,
    allowNull: true,
    enum: Object.keys(roleType),
    default: Object.keys(roleType)[1],
  },
  createdAt: {
    type: String,
    required: true,
    default: getCurrentTimeStamp(),
  },
  updatedAt: {
    type: String,
    allowNull: true,
  },
});

exports.UserRVMS = mongoose.model("UserRVMS", userSchema);
