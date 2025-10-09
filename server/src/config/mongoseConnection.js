const mongoose = require("mongoose");
const { MESSAGES } = require("../constants/message-constants");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(MESSAGES.DB_CONNECTED);
  } catch (error) {
    console.error(MESSAGES.DB_CONNECTION_FAILED, error.message);
    process.exit(1);
  }
};

module.exports = { dbConnect };
