import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { updateUserSchema } from "../schemas/updateUserSchema";
import { USER_API } from "../constants/api-constants";
import { ROUTES } from "../constants/route-constants";
import { TOAST_MESSAGES, TEXTS } from "../constants/text-constants";

export const useUpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

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

  const handleSubmit = async (values) => {
    toast
      .promise(
        axios.put(USER_API.UPDATE(id), values, { withCredentials: true }),
        {
          pending: { render: TEXTS.UPDATTING, autoClose: 2000 },
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
      .catch(() => {
        toast.error(TOAST_MESSAGES.USER_UPDATE_ERROR);
      });
  };

  const formik = useFormik({
    initialValues: initialValues || { name: "", email: "", age: "" },
    validationSchema: updateUserSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return { formik };
};
