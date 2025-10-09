const mongoose = require("mongoose");
const SCHEMA_MESSAGES = require("../constants/schema-messages");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, SCHEMA_MESSAGES.NAME_REQUIRED],
    minlength: [2, SCHEMA_MESSAGES.NAME_MIN],
    maxlength: [50, SCHEMA_MESSAGES.NAME_MAX],
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
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
