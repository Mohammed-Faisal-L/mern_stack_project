import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/Loading";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Users = lazy(() => import("./pages/Users"));
const CreateUser = lazy(() => import("./pages/CreateUser"));
const UpdateUser = lazy(() => import("./pages/UpdateUser"));

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/getUsers",
    element: (
      <Suspense fallback={<Loading />}>
        <Users />
      </Suspense>
    ),
  },
  {
    path: "/createUser",
    element: (
      <Suspense fallback={<Loading />}>
        <CreateUser />
      </Suspense>
    ),
  },
  {
    path: "/updateUser/:id",
    element: (
      <Suspense fallback={<Loading />}>
        <UpdateUser />
      </Suspense>
    ),
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
