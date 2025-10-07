import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Users from "./Users";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: () => mockedNavigate,
  };
});

describe("Users Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and displays users", async () => {
    axios.get.mockResolvedValue({
      data: [
        { _id: "1", name: "Alice", email: "alice@example.com", age: 25 },
        { _id: "2", name: "Bob", email: "bob@example.com", age: 30 },
      ],
    });

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:7777/user/getUsers",
      { withCredentials: true }
    );

    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Email: alice@example.com")).toBeInTheDocument();
    expect(screen.getByText("Age: 25")).toBeInTheDocument();

    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("clicking Add + navigates to /createUser", async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    const addButton = screen.getByText(/add \+/i);
    fireEvent.click(addButton);

    expect(mockedNavigate).toHaveBeenCalledWith("/createUser");
  });

  it("clicking Edit navigates to updateUser page", async () => {
    axios.get.mockResolvedValue({
      data: [{ _id: "1", name: "Alice", email: "alice@example.com", age: 25 }],
    });

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    const editButton = await screen.findByText(/edit/i);
    fireEvent.click(editButton);

    expect(mockedNavigate).toHaveBeenCalledWith("/updateUser/1");
  });

  it("clicking Delete calls delete API and refreshes list", async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ _id: "1", name: "Alice", email: "alice@example.com", age: 25 }],
    });

    axios.delete.mockResolvedValue({ status: 200 });

    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    const deleteButton = await screen.findByText(/delete/i);
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        "http://localhost:7777/user/deleteUser/1",
        { withCredentials: true }
      );
    });

    await waitFor(() => {
      expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    });
  });

  it("logs error if fetching users fails", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    axios.get.mockRejectedValue(new Error("Fetch failed"));

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching users:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  it("logs error if deleting user fails", async () => {
    axios.get.mockResolvedValue({
      data: [{ _id: "1", name: "Alice", email: "alice@example.com", age: 25 }],
    });

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    axios.delete.mockRejectedValue(new Error("Delete failed"));

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    const deleteButton = await screen.findByText(/delete/i);
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error deleting user:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  it("logs error if logout fails", async () => {
    axios.get.mockResolvedValue({ data: [] });

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    axios.post.mockRejectedValue(new Error("Logout failed"));

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error logging out:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  it("navigates to '/' on successful logout", async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("does NOT navigate on logout failure (status !== 200)", async () => {
    axios.post.mockResolvedValueOnce({ status: 500 });

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockedNavigate).not.toHaveBeenCalled();
    });
  });
});
