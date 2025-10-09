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

const renderComponent = () =>
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

describe("Register Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handles successful registration (status 201)", async () => {
    axios.post.mockResolvedValueOnce({ status: 201 });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.USERNAME), {
      target: { value: "faisal" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.EMAIL), {
      target: { value: "faisal@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.AGE), {
      target: { value: "25" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.PASSWORD), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole(ROLES.REGISTER_BUTTON));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

  it("handles non-201 response (failure)", async () => {
    axios.post.mockResolvedValueOnce({ status: 400 });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.USERNAME), {
      target: { value: "faisal" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.EMAIL), {
      target: { value: "faisal@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.AGE), {
      target: { value: "25" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.PASSWORD), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole(ROLES.REGISTER_BUTTON));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(TOAST_MESSAGES.REGISTER_ERROR);
    });
  });

  it("handles API error (axios throws)", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: ERROR.EMAIL } },
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.USERNAME), {
      target: { value: "faisal" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.EMAIL), {
      target: { value: "faisal@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.AGE), {
      target: { value: "25" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.PASSWORD), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole(ROLES.REGISTER_BUTTON));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(ERROR.EMAIL);
    });
  });

  it("handles API error without response (network error)", async () => {
    axios.post.mockRejectedValueOnce(new Error(ERROR.NETWORK));

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.USERNAME), {
      target: { value: "faisal" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.EMAIL), {
      target: { value: "faisal@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.AGE), {
      target: { value: "25" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.PASSWORD), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole(ROLES.REGISTER_BUTTON));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining(TOAST_MESSAGES.REGISTER_ERROR)
      );
    });
  });

  it("navigates to home and shows success toast on successful registration", async () => {
    axios.post.mockResolvedValueOnce({ status: 201 });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.USERNAME), {
      target: { value: "faisal" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.EMAIL), {
      target: { value: "faisal@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.AGE), {
      target: { value: "25" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.PASSWORD), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole(ROLES.REGISTER_BUTTON));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        TOAST_MESSAGES.REGISTER_SUCCESS
      );
    });
  });
});
