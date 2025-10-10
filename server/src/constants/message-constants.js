const USER_MESSAGES = {
  LOGIN_SUCCESS: "Logged in successfully",
  LOGIN_ERROR: "Something went wrong during login",
  LOGOUT_SUCCESS: "Logged out successfully",
  LOGOUT_ERROR: "Something went wrong during logout",
  FETCH_ERROR: "Error fetching users",
  FETCH_ONE_ERROR: "Error fetching user",
  NOT_FOUND: "User not found",
  CREATE_SUCCESS: "User created successfully",
  CREATE_ERROR: "Error creating user",
  UPDATE_SUCCESS: "User updated successfully",
  UPDATE_ERROR: "Error updating user",
  DELETE_SUCCESS: "User deleted successfully",
  DELETE_ERROR: "Error deleting user",
  REGISTER_SUCCESS: "User registered successfully",
  REGISTER_ERROR: "Error registering user",
  NO_USERS_FOR_ACCOUNT: "No users found for this account",
};

const MESSAGES = {
  TOKEN: "token",
  DB_CONNECTED: "Connected to MongoDB successfully",
  DB_CONNECTION_FAILED: "MongoDB connection failed:",
  INVALID_CREDENTIALS: "Invalid credentials",
  SERVER_RUNNING: (port) => `Server running on port ${port}...`,
  GENERIC_ERROR: "Something went wrong",
};

module.exports = { USER_MESSAGES, MESSAGES };
