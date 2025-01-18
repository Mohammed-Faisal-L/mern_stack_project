const mongoose = require("mongoose");

const url =
  "mongodb+srv://mdfaisala334:wQCchGk0SnkBEKaI@newcluster.h4rvp.mongodb.net/practiceCRUD";

const dbConnect = async () => {
  await mongoose.connect(url);
};

module.exports = { dbConnect };
