require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./config/mongoseConnection");
const userRouter = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const { MESSAGES } = require("./constants/message-constants");
const { USER_ROUTES } = require("./constants/route-constants");
const { errorHandler } = require("./middleware/errorHandler");
const helmet = require("helmet");

const server = express();

server.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.SERVER_URL],
    credentials: true,
  })
);
server.use(express.json());
server.use(cookieParser());
server.use(helmet());

server.use(USER_ROUTES.HOME, userRouter);
server.use(USER_ROUTES.HOME, authRoute);

server.use(errorHandler);

dbConnect()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(MESSAGES.SERVER_RUNNING(process.env.PORT));
    });
  })
  .catch((error) => {
    console.log(error, MESSAGES.DB_CONNECTION_FAILED);
  });
