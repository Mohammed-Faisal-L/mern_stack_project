import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { createUserSchema } from "../schemas/createUserSchema";
import { USER_API } from "../constants/api-constants";
import { ROUTES } from "../constants/route-constants";
import { TOAST_MESSAGES } from "../constants/text-constants";

export const useCreateUser = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    age: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(USER_API.CREATE, values, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(TOAST_MESSAGES.USER_CREATE_SUCCESS);
        resetForm();
        navigate(ROUTES.GET);
      }
    } catch (error) {
      toast.error(TOAST_MESSAGES.USER_CREATE_ERROR);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: createUserSchema,
    onSubmit: handleSubmit,
  });

  return { formik };
};
