const mongoose = require("mongoose");
const SCHEMA_MESSAGES = require("../constants/schema-messages");

const UserNameSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, SCHEMA_MESSAGES.USERNAME_REQUIRED],
    minlength: [3, SCHEMA_MESSAGES.USERNAME_MIN],
    maxlength: [30, SCHEMA_MESSAGES.USERNAME_MAX],
    trim: true,
  },
  email: {
    type: String,
    required: [true, SCHEMA_MESSAGES.EMAIL_REQUIRED],
    unique: true,
    match: [/.+@.+\..+/, SCHEMA_MESSAGES.EMAIL_INVALID],
  },
  age: {
    type: Number,
    required: [true, SCHEMA_MESSAGES.AGE_REQUIRED],
    min: [18, SCHEMA_MESSAGES.AGE_MIN],
    max: [100, SCHEMA_MESSAGES.AGE_MAX],
  },
  password: {
    type: String,
    required: [true, SCHEMA_MESSAGES.PASSWORD_REQUIRED],
    minlength: [6, SCHEMA_MESSAGES.PASSWORD_MIN],
  },
});

const UserNameModel = mongoose.model("username", UserNameSchema);

module.exports = UserNameModel;
