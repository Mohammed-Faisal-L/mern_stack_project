const jwt = require("jsonwebtoken");
const UserNameModel = require("../models/UserName");
const { USER_ROUTES } = require("../constants/route-constants");
const { MESSAGES } = require("../constants/message-constants");
const { STATUS_CODES } = require("../constants/status-constants");
const CustomError = require("../utils/CustomError");

const userAuth =
  (USER_ROUTES.BASE,
  async (request, response, next) => {
    try {
      const token = request.cookies?.token;

      if (!token) {
        throw new CustomError(
          MESSAGES.INVALID_CREDENTIALS,
          STATUS_CODES.UNAUTHORIZED
        );
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userInfo = await UserNameModel.findById(decoded.id);
      if (!userInfo) {
        throw new CustomError(
          MESSAGES.INVALID_CREDENTIALS,
          STATUS_CODES.UNAUTHORIZED
        );
      }

      request.user = userInfo;
      next();
    } catch (error) {
      next(error);
    }
  });

module.exports = { userAuth };
