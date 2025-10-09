const jwt = require("jsonwebtoken");
const UserNameModel = require("../models/UserName");
const { USER_ROUTES } = require("../constants/route-constants");
const { MESSAGES } = require("../constants/message-constants");
const { STATUS_CODES } = require("../constants/status-constants");

const userAuth =
  (USER_ROUTES.BASE,
  async (request, response, next) => {
    try {
      const cookies = request.cookies;
      const userId = await jwt.verify(cookies.token, process.env.JWT_SECRET);
      if (!userId) {
        throw new Error(MESSAGES.INVALID_CREDENTIALS);
      } else {
        const userInfo = await UserNameModel.findOne({ _id: userId.id });
        request.user = userInfo;
        next();
      }
    } catch (error) {
      response
        .status(STATUS_CODES.BAD_REQUEST)
        .send(MESSAGES.INVALID_CREDENTIALS || error.message);
    }
  });

module.exports = { userAuth };
