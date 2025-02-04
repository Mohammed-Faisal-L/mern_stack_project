import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateUser = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    age: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    age: Yup.number()
      .positive("Age must be positive")
      .integer("Age must be an integer")
      .required("Age is required")
      .typeError("Age must be a number"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:7777/user/createUser",
        values,
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/getUsers");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg md:max-w-md lg:max-w-lg xl:max-w-xl bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">
          Create User
        </h1>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="age"
              className="block text-lg font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="Enter your age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.age && formik.errors.age && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.age}
              </div>
            )}
          </div>

          <div>
            <button
              role="create"
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-blue-500 text-white text-lg font-semibold py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {formik.isSubmitting ? "Submitting..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
