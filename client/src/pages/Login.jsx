import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:7777/login", values, {
        withCredentials: true,
      });

      if (response.status === 200) {
        navigate("/getUsers");
      } else {
        throw new Error("Login failed, please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error.response?.data || error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
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

          <div>
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
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-blue-500 text-white text-lg font-semibold py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>

          <button
            role="login"
            type="button"
            onClick={() => navigate("/register")}
            className="w-full mt-4 bg-gray-300 text-gray-700 text-lg font-semibold py-3 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            No Account? Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
