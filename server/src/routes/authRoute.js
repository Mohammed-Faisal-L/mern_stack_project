const express = require("express");
const authRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserName");

authRoute.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(404).json({ error: "User doesn't exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    response.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    response.status(500).json({ error: "Something went wrong during login" });
  }
});

authRoute.post("/logout", async (request, response) => {
  try {
    response.cookie("token", null);
    response.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    response.status(500).json({ error: "Something went wrong during logout" });
  }
});

module.exports = authRoute;
