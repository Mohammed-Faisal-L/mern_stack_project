const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./config/mongoseConnection");
const userRouter = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const { userAuth } = require("./middleware/auth");

const server = express();

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
server.use(express.json());
server.use(cookieParser());

server.use("/", userRouter);
server.use("/", authRoute);
server.use("/", userAuth);

dbConnect()
  .then(() => {
    console.log("connection to the database is success...");
    server.listen(7777, () => {
      console.log("server running on port 7777...");
    });
  })
  .catch((error) => {
    console.log(error, " error in the connection...");
  });
