const express = require("express");
const authRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserName");
const { AUTH_ROUTES } = require("../constants/route-constants");
const { STATUS_CODES } = require("../constants/status-constants");
const { USER_MESSAGES, MESSAGES } = require("../constants/message-constants");

authRoute.post(AUTH_ROUTES.LOGIN, async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return response
        .status(STATUS_CODES.NOT_FOUND)
        .json({ error: USER_MESSAGES.NOT_FOUND });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ error: MESSAGES.INVALID_CREDENTIALS });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    response.cookie(MESSAGES.TOKEN, token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    response
      .status(STATUS_CODES.SUCCESS)
      .json({ message: USER_MESSAGES.LOGIN_SUCCESS, token });
  } catch (error) {
    response
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: USER_MESSAGES.LOGIN_ERROR || error.message });
  }
});

authRoute.post(AUTH_ROUTES.LOGOUT, async (request, response) => {
  try {
    response.cookie(MESSAGES.TOKEN, null);
    response
      .status(STATUS_CODES.SUCCESS)
      .json({ message: USER_MESSAGES.LOGOUT_SUCCESS });
  } catch (error) {
    response
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: USER_MESSAGES.LOGIN_ERROR || error.message });
  }
});

module.exports = authRoute;
