import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./common/Loading";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ROUTES } from "./constants/route-constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = lazy(() => import("./pages/Users"));
const CreateUser = lazy(() => import("./pages/CreateUser"));
const UpdateUser = lazy(() => import("./pages/UpdateUser"));

const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <Login /> },
  { path: ROUTES.REGISTER, element: <Register /> },
  {
    path: ROUTES.GET,
    element: (
      <Suspense fallback={<Loading />}>
        <Users />
      </Suspense>
    ),
  },
  {
    path: ROUTES.CREATE,
    element: (
      <Suspense fallback={<Loading />}>
        <CreateUser />
      </Suspense>
    ),
  },
  {
    path: ROUTES.UPDATE,
    element: (
      <Suspense fallback={<Loading />}>
        <UpdateUser />
      </Suspense>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="colored"
    />
  </React.StrictMode>
);

reportWebVitals();
