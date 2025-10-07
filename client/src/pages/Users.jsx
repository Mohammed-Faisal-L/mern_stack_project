import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TEXTS, TOAST_MESSAGES } from "../constants/text-constants";
import { USER_API } from "../constants/api-constants";
import { ROUTES } from "../constants/route-constants";
import { toast } from "react-toastify";
import Button from "../common/Button";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(USER_API.GET_ALL, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUsers(response.data);
      } else {
        toast.error(TOAST_MESSAGES.USERS_FETCH_ERROR);
      }
    } catch (error) {
      console.error(
        TOAST_MESSAGES.USERS_FETCH_ERROR,
        error.response?.data || error
      );
      toast.error(
        error.response?.data?.message || TOAST_MESSAGES.USERS_FETCH_ERROR
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(USER_API.DELETE(id), {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success(TOAST_MESSAGES.USER_DELETE_SUCCESS);
        fetchUsers();
      } else {
        toast.error(TOAST_MESSAGES.USER_DELETE_ERROR);
      }
    } catch (error) {
      console.error(
        TOAST_MESSAGES.USER_DELETE_ERROR,
        error.response?.data || error
      );
      toast.error(
        error.response?.data?.message || TOAST_MESSAGES.USER_DELETE_ERROR
      );
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(USER_API.LOGOUT, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(TOAST_MESSAGES.LOGOUT_SUCCESS);
        navigate(ROUTES.HOME);
      } else {
        toast.error(TOAST_MESSAGES.LOGIN_ERROR);
      }
    } catch (error) {
      console.error(TOAST_MESSAGES.LOGIN_ERROR, error.response?.data || error);
      toast.error(error.response?.data?.message || TOAST_MESSAGES.LOGIN_ERROR);
    }
  };

  return (
    <div
      role="users-container"
      className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-7xl bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => navigate(ROUTES.CREATE)}
            text={TEXTS.ADD}
            variant="primary"
            size="sm"
            fullWidth={false}
          />
          <Button
            onClick={handleLogout}
            text={TEXTS.LOGOUT}
            variant="danger"
            size="sm"
            fullWidth={false}
          />{" "}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-gray-600">
                {TEXTS.EMAIL}: {user.email}
              </p>
              <p className="text-gray-600">
                {TEXTS.AGE}: {user.age}
              </p>
              <div className="flex justify-between mt-4">
                <Button
                  onClick={() => navigate(ROUTES.UPDATES(user._id))}
                  text={TEXTS.EDIT}
                  variant="success"
                  size="sm"
                  fullWidth={false}
                  rounded="md"
                />
                <Button
                  onClick={() => deleteUser(user._id)}
                  text={TEXTS.DELETE}
                  variant="danger"
                  size="sm"
                  fullWidth={false}
                  rounded="md"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
