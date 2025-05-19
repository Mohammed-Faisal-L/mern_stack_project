import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "./Register";
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

describe("Register Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with all input fields", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("register"));

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/age is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it("handles API errors gracefully", async () => {
    axios.post.mockRejectedValueOnce(new Error("Network error"));

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: "25" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "test1234" },
    });

    fireEvent.click(screen.getByRole("register"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(mockedNavigate).not.toHaveBeenCalled();
    });
  });
});
