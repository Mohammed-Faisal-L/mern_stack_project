const jwt = require("jsonwebtoken");
const UserNameModel = require("../models/UserName");

const userAuth =
  ("/user",
  async (request, response, next) => {
    try {
      const cookies = request.cookies;
      const userId = await jwt.verify(cookies.token, process.env.JWT_SECRET);
      if (!userId) {
        throw new Error("invalid credentials...");
      } else {
        const userInfo = await UserNameModel.findOne({ _id: userId.id });
        request.user = userInfo;
        next();
      }
    } catch (error) {
      response.status(400).send("invalid credentials...");
    }
  });

module.exports = { userAuth };
