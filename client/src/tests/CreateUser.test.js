import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import CreateUser from "../pages/CreateUser";
import { ERROR, PLACEHOLDERS, ROLES } from "../constants/text-constants";

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
      <CreateUser />
    </MemoryRouter>
  );

describe("CreateUser Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handles successful user creation", async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.NAME), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.EMAIL), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.AGE), {
      target: { value: "25" },
    });

    fireEvent.click(screen.getByRole(ROLES.CREATE_USER_BUTTON));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

  it("handles not successful user creation", async () => {
    axios.post.mockResolvedValueOnce({ status: 400 });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.NAME), {
      target: { value: "Wrong" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.EMAIL), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.AGE), {
      target: { value: "25" },
    });

    fireEvent.click(screen.getByRole(ROLES.CREATE_USER_BUTTON));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

  it("handles API failure", async () => {
    axios.post.mockRejectedValueOnce(new Error(ERROR.API));

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.NAME), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.EMAIL), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.AGE), {
      target: { value: "25" },
    });

    fireEvent.click(screen.getByRole(ROLES.CREATE_USER_BUTTON));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });
});
