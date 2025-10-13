import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";
import {
  ERROR,
  PLACEHOLDERS,
  ROLES,
  TOAST_MESSAGES,
} from "../constants/text-constants";
import { ROUTES } from "../constants/route-constants";
import axios from "axios";
import { toast } from "react-toastify";
import FormInput from "../common/FormInput";

jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    promise: jest.fn((promise, messages) => promise),
  },
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockFormik = {
  touched: {},
  errors: {},
  getFieldProps: jest.fn(() => ({
    name: "password",
    value: "",
    onChange: jest.fn(),
    onBlur: jest.fn(),
  })),
};

const renderLogin = () =>
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

const fillLoginForm = (email, password) => {
  fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.EMAIL), {
    target: { value: email },
  });
  fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.PASSWORD), {
    target: { value: password },
  });
};

const clickLoginButton = () =>
  fireEvent.click(screen.getByRole(ROLES.LOGIN_BUTTON));

describe("Login Component", () => {
  it("renders Login Component", () => {
    renderLogin();

    expect(screen.getByRole(ROLES.LOGIN_BUTTON)).toBeInTheDocument();
    expect(screen.getByRole(ROLES.NO_ACCOUNT_BUTTON)).toBeInTheDocument();
  });

  it("navigates to Register page when 'No Account' button is clicked", () => {
    renderLogin();
    fireEvent.click(screen.getByRole(ROLES.NO_ACCOUNT_BUTTON));
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.REGISTER);
  });

  it("submits login form and navigates on success", async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });
    renderLogin();

    fillLoginForm("test1@gmail.com", "test1@123");
    clickLoginButton();

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(toast.success).toHaveBeenCalled();
  });

  it("handles login error (else part when status !== 200)", async () => {
    axios.post.mockResolvedValueOnce({ status: 400 });
    renderLogin();

    fillLoginForm("wrong@example.com", "wrongpass");
    clickLoginButton();

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  });

  it("handles login failure (catch block)", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: ERROR.NETWORK } },
    });
    renderLogin();

    fillLoginForm("test@example.com", "password123");
    clickLoginButton();

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  });

  it("shows toast error for non-200 response", async () => {
    axios.post.mockResolvedValueOnce({ status: 400 });
    renderLogin();

    fillLoginForm("wrong@example.com", "wrongpass");
    clickLoginButton();

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(TOAST_MESSAGES.LOGIN_ERROR)
    );
  });

  it("shows generic toast error when error.response is undefined", async () => {
    axios.post.mockRejectedValueOnce(new Error(ERROR.NETWORK));
    renderLogin();

    fillLoginForm("test@example.com", "password123");
    clickLoginButton();

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(TOAST_MESSAGES.LOGIN_ERROR)
    );
  });

  it("toggles password visibility when eye icon is clicked", () => {
    render(
      <FormInput
        label="Password"
        id="password"
        name="password"
        type="password"
        placeholder={PLACEHOLDERS.PASSWORD}
        formik={mockFormik}
      />
    );

    const input = screen.getByPlaceholderText(PLACEHOLDERS.PASSWORD);
    expect(input).toHaveAttribute("type", "password");

    const toggleButton = screen.getByRole(ROLES.EYE);

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });
});
