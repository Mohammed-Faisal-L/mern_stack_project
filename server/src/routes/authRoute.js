const express = require("express");
const authRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserName");
const { AUTH_ROUTES } = require("../constants/route-constants");
const { STATUS_CODES } = require("../constants/status-constants");
const { USER_MESSAGES, MESSAGES } = require("../constants/message-constants");

authRoute.post(AUTH_ROUTES.LOGIN, async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email });

    if (!user) throw new CustomError(USER_MESSAGES, STATUS_CODES.NOT_FOUND);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ error: MESSAGES.INVALID_CREDENTIALS });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    response.cookie(MESSAGES.TOKEN, token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    response
      .status(STATUS_CODES.SUCCESS)
      .json({ message: USER_MESSAGES.LOGIN_SUCCESS, token });
  } catch (error) {
    next(error);
  }
});

authRoute.post(AUTH_ROUTES.LOGOUT, async (request, response, next) => {
  try {
    response.cookie(MESSAGES.TOKEN, null);
    response
      .status(STATUS_CODES.SUCCESS)
      .json({ message: USER_MESSAGES.LOGOUT_SUCCESS });
  } catch (error) {
    next(error);
  }
});

module.exports = authRoute;
