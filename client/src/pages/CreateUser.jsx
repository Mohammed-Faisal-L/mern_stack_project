import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { createUserSchema } from "../schemas/createUserSchema";
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

const CreateUser = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    age: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(USER_API.CREATE, values, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(TOAST_MESSAGES.USER_CREATE_SUCCESS);
        formik.resetForm();
        navigate(ROUTES.GET);
      }
    } catch (error) {
      toast.error(TOAST_MESSAGES.USER_CREATE_ERROR);
    }
  };

  const formik = useFormik({
    initialValues,
    createUserSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg md:max-w-md lg:max-w-lg xl:max-w-xl bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <Header text={TEXTS.CREATE_USER} />

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <FormInput
            label={TEXTS.NAME}
            id="name"
            name="name"
            type="text"
            placeholder={PLACEHOLDERS.NAME}
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

          <div>
            <Button
              role="create"
              type="submit"
              isLoading={formik.isSubmitting}
              text={TEXTS.CREATE_USER}
              loadingText={TEXTS.SUBMITTING}
              variant="primary"
              size="lg"
              fullWidth
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
