import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { loginSchema } from "../schemas/loginSchema";
import { USER_API } from "../constants/api-constants";
import { ROUTES } from "../constants/route-constants";
import { TOAST_MESSAGES } from "../constants/text-constants";

export const useLogin = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(USER_API.LOGIN, values, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success(TOAST_MESSAGES.LOGIN_SUCCESS);
        resetForm();
        navigate(ROUTES.GET);
      } else {
        toast.error(TOAST_MESSAGES.LOGIN_ERROR);
      }
    } catch (error) {
      console.error(TOAST_MESSAGES.LOGIN_ERROR, error.response?.data || error);
      toast.error(error.response?.data?.message || TOAST_MESSAGES.LOGIN_ERROR);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  });

  return { formik, navigate };
};
