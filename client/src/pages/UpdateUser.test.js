import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UpdateUser from "./UpdateUser";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: () => mockedNavigate,
    useParams: () => ({ id: "123" }),
  };
});

describe("UpdateUser Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading before data loads", () => {
    axios.get.mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter>
        <UpdateUser />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading user details/i)).toBeInTheDocument();
  });

  it("fetches user data and populates form", async () => {
    axios.get.mockResolvedValue({
      data: { name: "John Doe", email: "john@example.com", age: 30 },
    });

    render(
      <MemoryRouter>
        <UpdateUser />
      </MemoryRouter>
    );

    expect(await screen.findByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("30")).toBeInTheDocument();
  });

  it("shows validation errors if fields are empty", async () => {
    axios.get.mockResolvedValueOnce({
      data: { name: "", email: "", age: "" },
    });

    render(
      <MemoryRouter>
        <UpdateUser />
      </MemoryRouter>
    );

    const submitButton = await screen.findByRole("update");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });
  });

  it("submits the form and navigates on success", async () => {
    axios.get.mockResolvedValueOnce({
      data: { name: "Jane", email: "jane@example.com", age: 25 },
    });

    axios.put.mockResolvedValueOnce({ status: 200 });

    render(
      <MemoryRouter>
        <UpdateUser />
      </MemoryRouter>
    );

    expect(await screen.findByDisplayValue("Jane")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Jane Updated" },
    });

    fireEvent.click(screen.getByRole("update"));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalled();
    });
  });

  it("handles error during user fetch", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    axios.get.mockRejectedValueOnce(new Error("Fetch error"));

    render(
      <MemoryRouter>
        <UpdateUser />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching user:",
        expect.any(Error)
      )
    );

    consoleSpy.mockRestore();
  });

  it("logs error if update API call fails", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    axios.get.mockResolvedValueOnce({
      data: { name: "Jane", email: "jane@example.com", age: 25 },
    });

    axios.put.mockRejectedValueOnce(new Error("Update failed"));

    render(
      <MemoryRouter>
        <UpdateUser />
      </MemoryRouter>
    );

    expect(await screen.findByDisplayValue("Jane")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("update"));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Update failed:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});
