const USER_BASE = "/user";

const AUTH_ROUTES = {
  LOGIN: "/login",
  LOGOUT: "/logout",
};

const USER_ROUTES = {
  HOME: "/",
  BASE: USER_BASE,
  REGISTER: "/register",
  GET_USERS: `${USER_BASE}/getUsers`,
  CREATE_USER: `${USER_BASE}/createUser`,
  GET_USER_BY_ID: `${USER_BASE}/getUser/:id`,
  UPDATE_USER_BY_ID: `${USER_BASE}/updateUser/:id`,
  DELETE_USER_BY_ID: `${USER_BASE}/deleteUser/:id`,
};

module.exports = { AUTH_ROUTES, USER_ROUTES };
