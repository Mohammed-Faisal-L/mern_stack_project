export const TEXTS = {
  CREATE_USER: "Create User",
  NAME: "Name",
  EMAIL: "Email",
  AGE: "Age",
  SUBMITTING: "Submitting...",
  LOGIN: "Login",
  PASSWORD: "Password",
  LOGGING: "Logging in...",
  NO_ACCOUNT: "No Account? Register",
  REGISTER: "Register",
  USERNAME: "Username",
  UPDATE_USER: "Update User",
  UPDATTING: "Updating...",
  UPDATE: "Update",
  LOADING: "Loading user details...",
  ADD: "Add +",
  LOGOUT: "Logout",
  EDIT: "Edit",
  DELETE: "Delete",
};

export const PLACEHOLDERS = {
  NAME: "Enter your name",
  USERNAME: "Enter your username",
  EMAIL: "Enter your email",
  PASSWORD: "Enter your password",
  AGE: "Enter your age",
};

export const MESSAGES = {
  REQUIRED_NAME: "Name is required",
  REQUIRED_USERNAME: "Username is required",
  REQUIRED_EMAIL: "Email is required",
  INVALID_EMAIL: "Invalid email address",
  REQUIRED_PASSWORD: "Password is required",
  PASSWORD_MIN: "Password must be at least 6 characters",
  REQUIRED_AGE: "Age is required",
  AGE_POSITIVE: "Age must be positive",
  AGE_INTEGER: "Age must be an integer",
  AGE_NUMBER: "Age must be a number",
};

export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: "Welcome back!",
  LOGIN_ERROR: "Invalid credentials. Please try again.",
  REGISTER_SUCCESS: "Account created successfully!",
  REGISTER_ERROR: "Registration failed. Try again.",
  LOGOUT_SUCCESS: "Logged out successfully.",
  LOGOUT_ERROR: "Failed to logout.",
  USER_CREATE_SUCCESS: "User created successfully!",
  USER_CREATE_ERROR: "Failed to create user.",
  USER_UPDATE_SUCCESS: "User updated successfully!",
  USER_UPDATE_ERROR: "Failed to update user.",
  USER_DELETE_SUCCESS: "User deleted successfully!",
  USER_DELETE_ERROR: "Failed to delete user.",
  USER_FETCH_ERROR: "Unable to load user. Please refresh.",
  USERS_FETCH_ERROR: "Unable to load users. Please refresh.",
};

export const ROLES = {
  APP: "app",
  STATUS: "status",
  LOGIN_BUTTON: "login",
  REGISTER_BUTTON: "register",
  NO_ACCOUNT_BUTTON: "noaccount",
  ADD_USER_BUTTON: "add",
  LOGOUT_BUTTON: "logout",
  EDIT_USER_BUTTON: "edit",
  DELETE_USER_BUTTON: "delete",
  CREATE_USER_BUTTON: "create",
  UPDATE_USER_BUTTON: "update",
};

export const TEST_IDS = {
  USERS_CONTAINER: "users-container",
  EDIT_BUTTON: (id) => `edit-button-${id}`,
  DELETE_BUTTON: (id) => `delete-button-${id}`,
  EDIT_REGEX: /edit-button-/,
  DELETE_REGEX: /delete-button-/,
};

export const ERROR = {
  API: "API failed",
  NETWORK: "Network error",
  EMAIL: "Email already exists",
  FETCH: "Fetch Error",
  LOGOUT: "Logout Error",
};
