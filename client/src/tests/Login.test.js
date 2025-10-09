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

const renderComponent = () =>
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

describe("Login Component", () => {
  it("renders Login Component", () => {
    renderComponent();

    expect(screen.getByRole(ROLES.LOGIN_BUTTON)).toBeInTheDocument();
    expect(screen.getByRole(ROLES.NO_ACCOUNT_BUTTON)).toBeInTheDocument();
  });

  it("navigates to Register page when 'No Account' button is clicked", () => {
    renderComponent();

    const noAccountButton = screen.getByRole(ROLES.NO_ACCOUNT_BUTTON);
    fireEvent.click(noAccountButton);

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.REGISTER);
  });

  it("submits login form and navigates on success", async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.EMAIL), {
      target: { value: "test1@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.PASSWORD), {
      target: { value: "test1@123" },
    });

    fireEvent.click(screen.getByRole(ROLES.LOGIN_BUTTON));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(toast.success).toHaveBeenCalled();
  });

  it("handles login error (else part when status !== 200)", async () => {
    axios.post.mockResolvedValueOnce({ status: 400 });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.EMAIL), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.PASSWORD), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole(ROLES.LOGIN_BUTTON));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

  it("handles login failure (catch block)", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: ERROR.NETWORK } },
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.EMAIL), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.PASSWORD), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole(ROLES.LOGIN_BUTTON));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

  it("shows toast error for non-200 response", async () => {
    axios.post.mockResolvedValueOnce({ status: 400 });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.EMAIL), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.PASSWORD), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole(ROLES.LOGIN_BUTTON));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(TOAST_MESSAGES.LOGIN_ERROR);
    });
  });

  it("shows generic toast error when error.response is undefined", async () => {
    axios.post.mockRejectedValueOnce(new Error(ERROR.NETWORK));

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.EMAIL), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.PASSWORD), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole(ROLES.LOGIN_BUTTON));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(TOAST_MESSAGES.LOGIN_ERROR);
    });
  });
});
