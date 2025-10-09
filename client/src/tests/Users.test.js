import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Users from "../pages/Users";
import { MemoryRouter } from "react-router-dom";
import {
  ERROR,
  ROLES,
  TEST_IDS,
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
    promise: jest.fn((p) => p),
  },
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockUsers = [
  { _id: "1", name: "John Doe", email: "john@example.com", age: 25 },
  { _id: "2", name: "Jane Smith", email: "jane@example.com", age: 30 },
];

const renderUsers = () =>
  render(
    <MemoryRouter>
      <Users />
    </MemoryRouter>
  );

describe("Users Component + useUsers Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders users and buttons correctly", async () => {
    axios.get.mockResolvedValue({ status: 200, data: mockUsers });

    renderUsers();

    const editButtons = await screen.findAllByTestId(TEST_IDS.EDIT_REGEX);
    const deleteButtons = await screen.findAllByTestId(TEST_IDS.DELETE_REGEX);
    const addButton = await screen.findByRole(ROLES.ADD_USER_BUTTON);
    const logoutButton = await screen.findByRole(ROLES.LOGOUT_BUTTON);

    expect(editButtons.length).toBe(mockUsers.length);
    expect(deleteButtons.length).toBe(mockUsers.length);
    expect(addButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  it("renders correctly when no users are found", async () => {
    axios.get.mockResolvedValue({ status: 200, data: [] });

    renderUsers();

    const container = await screen.findByTestId(TEST_IDS.USERS_CONTAINER);
    expect(container).toBeInTheDocument();
    expect(screen.queryByTestId(TEST_IDS.EDIT_REGEX)).toBeNull();
    expect(screen.queryByTestId(TEST_IDS.DELETE_REGEX)).toBeNull();
  });

  it("handles Add button click correctly", async () => {
    axios.get.mockResolvedValue({ status: 200, data: mockUsers });

    renderUsers();

    const addButton = await screen.findByRole(ROLES.ADD_USER_BUTTON);
    fireEvent.click(addButton);

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.CREATE);
  });

  it("handles Edit button click correctly", async () => {
    axios.get.mockResolvedValue({ status: 200, data: mockUsers });

    renderUsers();

    const editButtons = await screen.findAllByTestId(TEST_IDS.EDIT_REGEX);
    fireEvent.click(editButtons[0]);

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.UPDATES(mockUsers[0]._id));
  });

  it("handles Delete button click successfully", async () => {
    axios.get.mockResolvedValue({ status: 200, data: mockUsers });
    axios.delete.mockResolvedValue({ status: 200 });

    renderUsers();

    const deleteButtons = await screen.findAllByTestId(TEST_IDS.DELETE_REGEX);
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        expect.stringContaining(mockUsers[0]._id),
        { withCredentials: true }
      );
    });
  });

  it("handles Logout button click successfully", async () => {
    axios.get.mockResolvedValue({ status: 200, data: mockUsers });
    axios.post.mockResolvedValue({ status: 200 });

    renderUsers();

    const logoutButton = await screen.findByRole(ROLES.LOGOUT_BUTTON);
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(TOAST_MESSAGES.LOGOUT_SUCCESS);
    });
  });

  it("handles Logout button error case", async () => {
    axios.get.mockResolvedValue({ status: 200, data: mockUsers });
    axios.post.mockRejectedValue({
      response: { data: { message: ERROR.LOGOUT } },
    });

    renderUsers();

    const logoutButton = await screen.findByRole(ROLES.LOGOUT_BUTTON);
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(ERROR.LOGOUT);
    });
  });

  it("handles fetchUsers error", async () => {
    axios.get.mockRejectedValue({
      response: { data: { message: ERROR.FETCH } },
    });

    renderUsers();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(ERROR.FETCH);
    });
  });

  it("handles non-200 response for fetchUsers", async () => {
    axios.get.mockResolvedValueOnce({ status: 500, data: [] });

    renderUsers();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        TOAST_MESSAGES.USERS_FETCH_ERROR
      );
    });
  });

  it("handles non-200 response for deleteUser", async () => {
    axios.get.mockResolvedValue({ status: 200, data: mockUsers });
    axios.delete.mockResolvedValueOnce({ status: 500 });

    renderUsers();
    const deleteButtons = await screen.findAllByTestId(TEST_IDS.DELETE_REGEX);
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        TOAST_MESSAGES.USER_DELETE_ERROR
      );
    });
  });

  it("handles non-200 response for handleLogout", async () => {
    axios.get.mockResolvedValue({ status: 200, data: mockUsers });
    axios.post.mockResolvedValueOnce({ status: 500 });

    renderUsers();
    const logoutButton = await screen.findByRole(ROLES.LOGOUT_BUTTON);
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(TOAST_MESSAGES.LOGIN_ERROR);
    });
  });

  it("handles fetchUsers error with no response.data.message", async () => {
    axios.get.mockRejectedValue({});

    renderUsers();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        TOAST_MESSAGES.USERS_FETCH_ERROR
      );
    });
  });

  it("handles deleteUser error with no response.data.message", async () => {
    axios.get.mockResolvedValue({ status: 200, data: mockUsers });
    axios.delete.mockRejectedValue({});

    renderUsers();
    const deleteButtons = await screen.findAllByTestId(TEST_IDS.DELETE_REGEX);
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        TOAST_MESSAGES.USER_DELETE_ERROR
      );
    });
  });

  it("handles handleLogout error with no response.data.message", async () => {
    axios.get.mockResolvedValue({ status: 200, data: mockUsers });
    axios.post.mockRejectedValue({});

    renderUsers();
    const logoutButton = await screen.findByRole(ROLES.LOGOUT_BUTTON);
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(TOAST_MESSAGES.LOGIN_ERROR);
    });
  });
});
