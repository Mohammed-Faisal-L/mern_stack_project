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

const renderCreateUser = () =>
  render(
    <MemoryRouter>
      <CreateUser />
    </MemoryRouter>
  );

const fillUserForm = (name, email, age) => {
  fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.NAME), {
    target: { value: name },
  });
  fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.EMAIL), {
    target: { value: email },
  });
  fireEvent.change(screen.getByPlaceholderText(PLACEHOLDERS.AGE), {
    target: { value: age },
  });
};

const clickCreateUserButton = () =>
  fireEvent.click(screen.getByRole(ROLES.CREATE_USER_BUTTON));

describe("CreateUser Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handles successful user creation", async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });

    renderCreateUser();
    fillUserForm("John", "john@example.com", "25");
    clickCreateUserButton();

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  });

  it("handles not successful user creation", async () => {
    axios.post.mockResolvedValueOnce({ status: 400 });

    renderCreateUser();
    fillUserForm("Wrong", "wrong@example.com", "25");
    clickCreateUserButton();

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  });

  it("handles API failure", async () => {
    axios.post.mockRejectedValueOnce(new Error(ERROR.API));

    renderCreateUser();
    fillUserForm("John", "john@example.com", "25");
    clickCreateUserButton();

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
  });
});
