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

const renderUsersPage = () =>
  render(
    <MemoryRouter>
      <Users />
    </MemoryRouter>
  );

const mockFetchUsers = (users = mockUsers, status = 200) => {
  axios.get.mockResolvedValue({ status, data: users });
};

const clickAddUser = async () => {
  const addButton = await screen.findByRole(ROLES.ADD_USER_BUTTON);
  fireEvent.click(addButton);
};

const clickEditUser = async (index = 0) => {
  const editButtons = await screen.findAllByTestId(TEST_IDS.EDIT_REGEX);
  fireEvent.click(editButtons[index]);
};

const clickDeleteUser = async (index = 0) => {
  const deleteButtons = await screen.findAllByTestId(TEST_IDS.DELETE_REGEX);
  fireEvent.click(deleteButtons[index]);
};

const clickLogout = async () => {
  const logoutButton = await screen.findByRole(ROLES.LOGOUT_BUTTON);
  fireEvent.click(logoutButton);
};

describe("Users Component + useUsers Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders users and buttons correctly", async () => {
    mockFetchUsers();
    renderUsersPage();

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
    mockFetchUsers([], 200);
    renderUsersPage();

    const container = await screen.findByTestId(TEST_IDS.USERS_CONTAINER);
    expect(container).toBeInTheDocument();
    expect(screen.queryByTestId(TEST_IDS.EDIT_REGEX)).toBeNull();
    expect(screen.queryByTestId(TEST_IDS.DELETE_REGEX)).toBeNull();
  });

  it("handles Add button click correctly", async () => {
    mockFetchUsers();
    renderUsersPage();
    await clickAddUser();
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.CREATE);
  });

  it("handles Edit button click correctly", async () => {
    mockFetchUsers();
    renderUsersPage();
    await clickEditUser();
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.UPDATES(mockUsers[0]._id));
  });

  it("handles Delete button click successfully", async () => {
    mockFetchUsers();
    axios.delete.mockResolvedValue({ status: 200 });

    renderUsersPage();
    await clickDeleteUser();

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        expect.stringContaining(mockUsers[0]._id),
        {
          withCredentials: true,
        }
      );
    });
  });

  it("handles Logout button click successfully", async () => {
    mockFetchUsers();
    axios.post.mockResolvedValue({ status: 200 });

    renderUsersPage();
    await clickLogout();

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(TOAST_MESSAGES.LOGOUT_SUCCESS);
    });
  });

  it("handles Logout button error case", async () => {
    mockFetchUsers();
    axios.post.mockRejectedValue({
      response: { data: { message: ERROR.LOGOUT } },
    });

    renderUsersPage();
    await clickLogout();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(ERROR.LOGOUT);
    });
  });

  it("handles fetchUsers error", async () => {
    axios.get.mockRejectedValue({
      response: { data: { message: ERROR.FETCH } },
    });
    renderUsersPage();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(ERROR.FETCH);
    });
  });

  it("handles non-200 response for fetchUsers", async () => {
    mockFetchUsers([], 500);
    renderUsersPage();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        TOAST_MESSAGES.USERS_FETCH_ERROR
      );
    });
  });

  it("handles non-200 response for deleteUser", async () => {
    mockFetchUsers();
    axios.delete.mockResolvedValueOnce({ status: 500 });

    renderUsersPage();
    await clickDeleteUser();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        TOAST_MESSAGES.USER_DELETE_ERROR
      );
    });
  });

  it("handles non-200 response for handleLogout", async () => {
    mockFetchUsers();
    axios.post.mockResolvedValueOnce({ status: 500 });

    renderUsersPage();
    await clickLogout();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(TOAST_MESSAGES.LOGIN_ERROR);
    });
  });

  it("handles fetchUsers error with no response.data.message", async () => {
    axios.get.mockRejectedValue({});
    renderUsersPage();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        TOAST_MESSAGES.USERS_FETCH_ERROR
      );
    });
  });

  it("handles deleteUser error with no response.data.message", async () => {
    mockFetchUsers();
    axios.delete.mockRejectedValue({});

    renderUsersPage();
    await clickDeleteUser();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        TOAST_MESSAGES.USER_DELETE_ERROR
      );
    });
  });

  it("handles handleLogout error with no response.data.message", async () => {
    mockFetchUsers();
    axios.post.mockRejectedValue({});

    renderUsersPage();
    await clickLogout();

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(TOAST_MESSAGES.LOGIN_ERROR);
    });
  });
});
