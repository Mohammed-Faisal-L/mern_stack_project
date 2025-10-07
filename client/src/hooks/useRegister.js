import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { registerSchema } from "../schemas/registerSchema";
import { USER_API } from "../constants/api-constants";
import { ROUTES } from "../constants/route-constants";
import { TOAST_MESSAGES } from "../constants/text-constants";

export const useRegister = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    age: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(USER_API.REGISTER, values);

      if (response.status === 201) {
        toast.success(TOAST_MESSAGES.REGISTER_SUCCESS);
        resetForm();
        navigate(ROUTES.HOME);
      } else {
        toast.error(TOAST_MESSAGES.REGISTER_ERROR);
      }
    } catch (error) {
      console.error(
        TOAST_MESSAGES.REGISTER_ERROR,
        error.response?.data || error
      );
      toast.error(
        error.response?.data?.message || TOAST_MESSAGES.REGISTER_ERROR
      );
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: handleSubmit,
  });

  return { formik };
};
