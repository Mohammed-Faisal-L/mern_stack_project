import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { updateUserSchema } from "../schemas/updateUserSchema";
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

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  const handleSubmit = async (values) => {
    toast
      .promise(
        axios.put(USER_API.UPDATE(id), values, { withCredentials: true }),
        {
          pending: {
            render: TEXTS.UPDATTING,
            autoClose: 2000,
          },
          success: {
            render: TOAST_MESSAGES.USER_UPDATE_SUCCESS,
            autoClose: 2000,
          },
          error: {
            render: (err) =>
              err.response?.data?.message || TOAST_MESSAGES.USER_UPDATE_ERROR,
            autoClose: 2000,
          },
        }
      )
      .then(() => {
        formik.resetForm();
        navigate(ROUTES.GET);
      })
      .catch((err) => {
        toast.error(TOAST_MESSAGES.USER_UPDATE_ERROR);
      });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(USER_API.GET_ONE(id), {
          withCredentials: true,
        });

        if (data) {
          setInitialValues({
            name: data.name,
            email: data.email,
            age: data.age,
          });
        }
      } catch (error) {
        toast.error(TOAST_MESSAGES.USER_FETCH_ERROR);
      }
    };
    fetchUser();
  }, [id]);

  const formik = useFormik({
    initialValues: initialValues || { name: "", email: "", age: "" },
    updateUserSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  if (!initialValues) {
    return <p className="text-center text-gray-500 mt-10">{TEXTS.LOADING}</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white p-10 rounded-lg shadow-md"
      >
        <Header text={TEXTS.UPDATE_USER} />

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

        <Button
          role="update"
          type="submit"
          isLoading={formik.isSubmitting}
          text={TEXTS.UPDATE}
          loadingText={TEXTS.UPDATTING}
          variant="primary"
          size="lg"
          fullWidth
        />
      </form>
    </div>
  );
};

export default UpdateUser;
