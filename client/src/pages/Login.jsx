import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/loginSchema";
import {
  PLACEHOLDERS,
  TEXTS,
  TOAST_MESSAGES,
} from "../constants/text-constants";
import { USER_API } from "../constants/api-constants";
import { ROUTES } from "../constants/route-constants";
import { toast } from "react-toastify";
import Header from "../common/Header";
import Button from "../common/Button";
import FormInput from "../common/FormInput";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(USER_API.LOGIN, values, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success(TOAST_MESSAGES.LOGIN_SUCCESS);
        formik.resetForm();
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
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <Header text={TEXTS.LOGIN} />

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <FormInput
            label={TEXTS.EMAIL}
            id="email"
            name="email"
            type="email"
            placeholder={PLACEHOLDERS.EMAIL}
            formik={formik}
          />

          <FormInput
            label={TEXTS.PASSWORD}
            id="password"
            name="password"
            type="password"
            placeholder={PLACEHOLDERS.PASSWORD}
            formik={formik}
          />

          <Button
            role="login"
            type="submit"
            isLoading={formik.isSubmitting}
            text={TEXTS.LOGIN}
            loadingText={TEXTS.LOGGING}
            variant="primary"
            size="lg"
            fullWidth
          />

          <Button
            role="login"
            type="button"
            onClick={() => navigate(ROUTES.REGISTER)}
            text={TEXTS.NO_ACCOUNT}
            variant="secondary"
            size="lg"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
