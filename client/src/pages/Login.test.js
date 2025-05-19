import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
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

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows validation errors when submitting empty form", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  test("shows validation errors on invalid email and short password", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "bad-email" },
    });
    fireEvent.blur(screen.getByLabelText(/email/i));
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123" },
    });
    fireEvent.blur(screen.getByLabelText(/password/i));

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText(/invalid email address/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/password must be at least 6 characters/i)
    ).toBeInTheDocument();
  });

  test("successful login triggers navigation", async () => {
    axios.post.mockResolvedValue({ status: 200 });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:7777/login",
        { email: "test@example.com", password: "password123" },
        { withCredentials: true }
      );
    });

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/getUsers");
    });
  });

  test("login failure with non-200 status does not navigate", async () => {
    axios.post.mockResolvedValue({ status: 401 });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());

    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  test("logs error on axios failure", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const errorResponse = { response: { data: "Invalid credentials" } };
    axios.post.mockRejectedValue(errorResponse);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error during login:",
        errorResponse.response.data
      );
    });

    expect(mockedNavigate).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it("navigates to '/register' when 'No Account? Register' button is clicked", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole("login");

    fireEvent.click(loginButton);

    expect(mockedNavigate).toHaveBeenCalledWith("/register");
  });
});
