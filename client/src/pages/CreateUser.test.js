import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateUser from "./CreateUser";
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

describe("CreateUser Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form fields", () => {
    render(
      <MemoryRouter>
        <CreateUser />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
  });

  it("shows validation errors on empty submission", async () => {
    render(
      <MemoryRouter>
        <CreateUser />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("create"));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/age is required/i)).toBeInTheDocument();
    });
  });

  it("handles API error gracefully", async () => {
    axios.post.mockRejectedValueOnce(new Error("API error"));

    render(
      <MemoryRouter>
        <CreateUser />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: "28" },
    });

    fireEvent.click(screen.getByRole("create"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(mockedNavigate).not.toHaveBeenCalled();
    });
  });

  it("navigates to /getUsers on successful user creation", async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });

    render(
      <MemoryRouter>
        <CreateUser />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: "30" },
    });

    fireEvent.click(screen.getByRole("create"));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/getUsers");
    });
  });
});
