export const TEXTS = {
  CREATE_USER: "Create User",
  NAME: "Name",
  EMAIL: "Email",
  AGE: "Age",
  SUBMITTING: "Submitting...",
  LOGIN: "Login",
  PASSWORD: "Password",
  LOGGING: "Logging In...",
  NO_ACCOUNT: "No Account? Register",
  ADD_USER: "No Users Found. Add One!",
  REGISTER: "Register",
  USERNAME: "Username",
  UPDATE_USER: "Update User",
  UPDATTING: "Updating...",
  UPDATE: "Update",
  LOADING: "Loading User Details...",
  ADD: "Add +",
  LOGOUT: "Logout",
  EDIT: "Edit",
  DELETE: "Delete",
  DELETING: "Deleting...",
};

export const PLACEHOLDERS = {
  NAME: "Enter Your Name",
  USERNAME: "Enter Your Username",
  EMAIL: "Enter Your Email",
  PASSWORD: "Enter Your Password",
  AGE: "Enter Your Age",
};

export const MESSAGES = {
  REQUIRED_NAME: "Name Is Required",
  REQUIRED_USERNAME: "Username Is Required",
  REQUIRED_EMAIL: "Email Is Required",
  INVALID_EMAIL: "Invalid Email Address",
  REQUIRED_PASSWORD: "Password Is Required",
  PASSWORD_MIN: "Password Must Be At Least 6 Characters",
  REQUIRED_AGE: "Age Is Required",
  AGE_POSITIVE: "Age Must Be Positive",
  AGE_INTEGER: "Age Must Be An Integer",
  AGE_NUMBER: "Age Must Be A Number",
};

export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: "Welcome Back!",
  LOGIN_ERROR: "Invalid Credentials. Please Try Again.",
  REGISTER_SUCCESS: "Account Created Successfully!",
  REGISTER_ERROR: "Registration Failed. Try Again.",
  LOGOUT_SUCCESS: "Logged Out Successfully.",
  LOGOUT_ERROR: "Failed To Logout.",
  USER_CREATE_SUCCESS: "User Created Successfully!",
  USER_CREATE_ERROR: "Failed To Create User.",
  USER_UPDATE_SUCCESS: "User Updated Successfully!",
  USER_UPDATE_ERROR: "Failed To Update User.",
  USER_DELETE_SUCCESS: "User Deleted Successfully!",
  USER_DELETE_ERROR: "Failed To Delete User.",
  USER_FETCH_ERROR: "Unable To Load User. Please Refresh.",
  USERS_FETCH_ERROR: "Unable To Load Users. Please Refresh.",
};

export const ROLES = {
  APP: "app",
  EYE: "eye",
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
  API: "API Failed",
  NETWORK: "Network Error",
  EMAIL: "Email Already Exists",
  FETCH: "Fetch Error",
  LOGOUT: "Logout Error",
};
