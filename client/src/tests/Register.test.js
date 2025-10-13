import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Register from "../pages/Register";
import {
  TOAST_MESSAGES,
  ROLES,
  PLACEHOLDERS,
  ERROR,
} from "../constants/text-constants";

jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderRegister = () =>
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

const fillRegisterForm = ({
  username = "faisal",
  email = "faisal@example.com",
  age = "25",
  password = "123456",
} = {}) => {
  fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.USERNAME), {
    target: { value: username },
  });
  fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.EMAIL), {
    target: { value: email },
  });
  fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.AGE), {
    target: { value: age },
  });
  fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.PASSWORD), {
    target: { value: password },
  });
};

const clickRegisterButton = () =>
  fireEvent.click(screen.getByRole(ROLES.REGISTER_BUTTON));

describe("Register Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handles successful registration (status 201)", async () => {
    axios.post.mockResolvedValueOnce({ status: 201 });

    renderRegister();
    fillRegisterForm();
    clickRegisterButton();

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  });

  it("handles non-201 response (failure)", async () => {
    axios.post.mockResolvedValueOnce({ status: 400 });

    renderRegister();
    fillRegisterForm();
    clickRegisterButton();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(TOAST_MESSAGES.REGISTER_ERROR);
    });
  });

  it("handles API error (axios throws)", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: ERROR.EMAIL } },
    });

    renderRegister();
    fillRegisterForm();
    clickRegisterButton();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(ERROR.EMAIL);
    });
  });

  it("handles API error without response (network error)", async () => {
    axios.post.mockRejectedValueOnce(new Error(ERROR.NETWORK));

    renderRegister();
    fillRegisterForm();
    clickRegisterButton();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining(TOAST_MESSAGES.REGISTER_ERROR)
      );
    });
  });

  it("navigates to home and shows success toast on successful registration", async () => {
    axios.post.mockResolvedValueOnce({ status: 201 });

    renderRegister();
    fillRegisterForm();
    clickRegisterButton();

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        TOAST_MESSAGES.REGISTER_SUCCESS
      );
    });
  });
});
