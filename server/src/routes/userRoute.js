const express = require("express");
const UserModel = require("../models/User");
const UserNameModel = require("../models/UserName");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middleware/auth");
const { USER_ROUTES } = require("../constants/route-constants");
const { USER_MESSAGES } = require("../constants/message-constants");
const { STATUS_CODES } = require("../constants/status-constants");
const userRouter = express.Router();

userRouter.get(
  USER_ROUTES.GET_USERS,
  userAuth,
  async (request, response, next) => {
    try {
      const users = await UserModel.find({ account: request.user._id });
      if (!users || users.length === 0)
        throw new CustomError(
          USER_MESSAGES.NO_USERS_FOR_ACCOUNT,
          STATUS_CODES.NOT_FOUND
        );
      response.json(users);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  USER_ROUTES.GET_USER_BY_ID,
  userAuth,
  async (request, response, next) => {
    try {
      const user = await UserModel.findOne({
        _id: request.params.id,
        account: request.user._id,
      });
      if (!user)
        throw new CustomError(USER_MESSAGES.NOT_FOUND, STATUS_CODES.NOT_FOUND);
      response.json(user);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put(
  USER_ROUTES.UPDATE_USER_BY_ID,
  userAuth,
  async (request, response, next) => {
    try {
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: request.params.id, account: request.user._id },
        request.body,
        { new: true }
      );
      if (!updatedUser)
        throw new CustomError(USER_MESSAGES.NOT_FOUND, STATUS_CODES.NOT_FOUND);
      response.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete(
  USER_ROUTES.DELETE_USER_BY_ID,
  userAuth,
  async (request, response, next) => {
    try {
      const deletedUser = await UserModel.findOneAndDelete({
        _id: request.params.id,
        account: request.user._id,
      });
      if (!deletedUser)
        throw new CustomError(USER_MESSAGES.NOT_FOUND, STATUS_CODES.NOT_FOUND);
      response.json({ message: USER_MESSAGES.DELETE_SUCCESS });
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  USER_ROUTES.CREATE_USER,
  userAuth,
  async (request, response, next) => {
    try {
      if (!request.body.name || !request.body.email || !request.body.age) {
        throw new CustomError(
          USER_MESSAGES.CREATE_ERROR,
          STATUS_CODES.BAD_REQUEST
        );
      }

      const newUser = await UserModel.create({
        ...request.body,
        account: request.user._id,
      });
      response.json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(USER_ROUTES.REGISTER, async (request, response, next) => {
  try {
    const { username, email, age, password } = request.body;

    if (!username || !email || !age || !password) {
      throw new CustomError(
        USER_MESSAGES.REGISTER_ERROR,
        STATUS_CODES.BAD_REQUEST
      );
    }

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
    next(error);
  }
});

module.exports = userRouter;
