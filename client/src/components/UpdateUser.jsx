import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

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
      const response = await axios.put(
        `http://localhost:7777/user/updateUser/${id}`,
        values,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/getUsers");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:7777/user/getUser/${id}`,
          { withCredentials: true }
        );

        if (data) {
          setInitialValues({
            name: data.name,
            email: data.email,
            age: data.age,
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const formik = useFormik({
    initialValues: initialValues || { name: "", email: "", age: "" },
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  if (!initialValues) {
    return (
      <p className="text-center text-gray-500 mt-10">Loading user details...</p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white p-10 rounded-lg shadow-md"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">
          Update User
        </h1>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            placeholder="Enter your name"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            placeholder="Enter your email"
            {...formik.getFieldProps("email")}
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
            className="block text-lg font-medium text-gray-700 mb-1"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            placeholder="Enter your age"
            {...formik.getFieldProps("age")}
          />
          {formik.touched.age && formik.errors.age && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.age}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-blue-500 text-white text-lg font-semibold py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {formik.isSubmitting ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
