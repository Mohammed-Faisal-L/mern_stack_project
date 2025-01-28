const express = require("express");
const UserModel = require("../models/User");
const UserNameModel = require("../models/UserName");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middleware/auth");
const userRouter = express.Router();

userRouter.get("/user/getUsers", userAuth, async (request, response) => {
  try {
    const users = await UserModel.find({});
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: "Error fetching users" });
  }
});

userRouter.get("/user/getUser/:id", userAuth, async (request, response) => {
  try {
    const user = await UserModel.findById(request.params.id);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    response.json(user);
  } catch (error) {
    response.status(500).json({ error: "Error fetching user" });
  }
});

userRouter.put("/user/updateUser/:id", userAuth, async (request, response) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    response.json(updatedUser);
  } catch (error) {
    response.status(500).json({ error: "Error updating user" });
  }
});

userRouter.delete(
  "/user/deleteUser/:id",
  userAuth,
  async (request, response) => {
    try {
      await UserModel.findByIdAndDelete(request.params.id);
      response.json({ message: "User deleted successfully" });
    } catch (error) {
      response.status(500).json({ error: "Error deleting user" });
    }
  }
);

userRouter.post("/user/createUser", userAuth, async (request, response) => {
  try {
    const newUser = await UserModel.create(request.body);
    response.json(newUser);
  } catch (error) {
    response.status(500).json({ error: "Error creating user" });
  }
});

userRouter.post("/register", async (request, response) => {
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
    response.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    response.status(500).json({ error: "Error registering user" });
  }
});

module.exports = userRouter;
