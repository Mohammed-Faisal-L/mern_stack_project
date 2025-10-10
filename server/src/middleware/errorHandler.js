const { MESSAGES } = require("../constants/message-constants");
const { STATUS_CODES } = require("../constants/status-constants");

const errorHandler = (err, request, response, next) => {
  console.error(err);
  const status = err.status || STATUS_CODES.SERVER_ERROR;
  const message = err.message || MESSAGES.GENERIC_ERROR;
  response.status(status).json({ error: message });
};

module.exports = { errorHandler };
