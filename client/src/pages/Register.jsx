import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { registerSchema } from "../schemas/registerSchema";
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

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    age: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(USER_API.REGISTER, values);

      if (response.status === 201) {
        toast.success(TOAST_MESSAGES.REGISTER_SUCCESS);
        formik.resetForm();
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
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm sm:max-w-md lg:max-w-lg"
      >
        <Header text={TEXTS.REGISTER} />

        <FormInput
          label={TEXTS.USERNAME}
          id="username"
          name="username"
          type="text"
          placeholder={PLACEHOLDERS.USERNAME}
          formik={formik}
        />

        <FormInput
          label={TEXTS.EMAIL}
          id="email"
          name="email"
          type="email"
          placeholder={PLACEHOLDERS.EMAIL}
          formik={formik}
        />

        <FormInput
          label={TEXTS.AGE}
          id="age"
          name="age"
          type="number"
          placeholder={PLACEHOLDERS.AGE}
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
          role="register"
          type="submit"
          isLoading={formik.isSubmitting}
          text={TEXTS.REGISTER}
          loadingText={TEXTS.SUBMITTING}
          variant="primary"
          size="lg"
          fullWidth
        />
      </form>
    </div>
  );
};

export default Register;
