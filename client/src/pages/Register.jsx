import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    age: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    age: Yup.number()
      .positive("Age must be positive")
      .integer("Age must be an integer")
      .required("Age is required")
      .typeError("Age must be a number"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:7777/register",
        values
      );

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm sm:max-w-md lg:max-w-lg"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            placeholder="Enter your username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.username}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
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

        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            placeholder="Enter your age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.age && formik.errors.age && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.age}</div>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>

        <button
          role="register"
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-blue-500 text-white text-lg font-semibold py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {formik.isSubmitting ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
