const express = require("express");
const UserModel = require("../models/User");
const UserNameModel = require("../models/UserName");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middleware/auth");
const { USER_ROUTES } = require("../constants/route-constants");
const { USER_MESSAGES } = require("../constants/message-constants");
const { STATUS_CODES } = require("../constants/status-constants");
const userRouter = express.Router();

userRouter.get(USER_ROUTES.GET_USERS, userAuth, async (request, response) => {
  try {
    const users = await UserModel.find({});
    response.json(users);
  } catch (error) {
    response
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: USER_MESSAGES.FETCH_ERROR || error.message });
  }
});

userRouter.get(
  USER_ROUTES.GET_USER_BY_ID,
  userAuth,
  async (request, response) => {
    try {
      const user = await UserModel.findById(request.params.id);
      if (!user) {
        return response
          .status(STATUS_CODES.NOT_FOUND)
          .json({ error: USER_MESSAGES.NOT_FOUND });
      }
      response.json(user);
    } catch (error) {
      response
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ error: USER_MESSAGES.FETCH_ONE_ERROR || error.message });
    }
  }
);

userRouter.put(
  USER_ROUTES.UPDATE_USER_BY_ID,
  userAuth,
  async (request, response) => {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
      );
      response.json(updatedUser);
    } catch (error) {
      response
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ error: USER_MESSAGES.UPDATE_ERROR || error.message });
    }
  }
);

userRouter.delete(
  USER_ROUTES.DELETE_USER_BY_ID,
  userAuth,
  async (request, response) => {
    try {
      await UserModel.findByIdAndDelete(request.params.id);
      response.json({ message: USER_MESSAGES.DELETE_SUCCESS });
    } catch (error) {
      response
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ error: USER_MESSAGES.DELETE_ERROR || error.message });
    }
  }
);

userRouter.post(
  USER_ROUTES.CREATE_USER,
  userAuth,
  async (request, response) => {
    try {
      const newUser = await UserModel.create(request.body);
      response.json(newUser);
    } catch (error) {
      response
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ error: USER_MESSAGES.CREATE_ERROR || error });
    }
  }
);

userRouter.post(USER_ROUTES.REGISTER, async (request, response) => {
  try {
    const { username, email, age, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new UserNameModel({
      username,
      email,
      age,
      password: hashedPassword,
    });

    await userData.save();
    response
      .status(STATUS_CODES.CREATED)
      .json({ message: USER_MESSAGES.REGISTER_SUCCESS });
  } catch (error) {
    response
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: USER_MESSAGES.REGISTER_ERROR || error.message });
  }
});

module.exports = userRouter;
