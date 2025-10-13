export const BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:7777";

export const USER_API = {
  CREATE: `${BASE_URL}/user/createUser`,
  LOGIN: `${BASE_URL}/login`,
  LOGOUT: `${BASE_URL}/logout`,
  REGISTER: `${BASE_URL}/register`,
  UPDATE: (id) => `${BASE_URL}/user/updateUser/${id}`,
  GET_ONE: (id) => `${BASE_URL}/user/getUser/${id}`,
  DELETE: (id) => `${BASE_URL}/user/deleteUser/${id}`,
  GET_ALL: `${BASE_URL}/user/getUsers`,
};
