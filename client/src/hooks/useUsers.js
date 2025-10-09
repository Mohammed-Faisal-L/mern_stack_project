import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { USER_API } from "../constants/api-constants";
import { ROUTES } from "../constants/route-constants";
import { TOAST_MESSAGES } from "../constants/text-constants";

export const useUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(USER_API.GET_ALL, {
        withCredentials: true,
      });
      if (response.status === 200) setUsers(response.data);
      else toast.error(TOAST_MESSAGES.USERS_FETCH_ERROR);
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

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(USER_API.DELETE(id), {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(TOAST_MESSAGES.USER_DELETE_SUCCESS);
        fetchUsers();
      } else toast.error(TOAST_MESSAGES.USER_DELETE_ERROR);
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
      } else toast.error(TOAST_MESSAGES.LOGIN_ERROR);
    } catch (error) {
      console.error(TOAST_MESSAGES.LOGIN_ERROR, error.response?.data || error);
      toast.error(error.response?.data?.message || TOAST_MESSAGES.LOGIN_ERROR);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, deleteUser, handleLogout, navigate };
};
