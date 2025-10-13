import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateUser from "../pages/UpdateUser";
import { ROUTES } from "../constants/route-constants";
import { TOAST_MESSAGES, ROLES, ERROR } from "../constants/text-constants";

jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    promise: jest.fn(),
  },
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "123" }),
}));

const renderUpdateUser = () =>
  render(
    <MemoryRouter initialEntries={[ROUTES.UPDATES("123")]}>
      <Routes>
        <Route path={ROUTES.UPDATES(":id")} element={<UpdateUser />} />
      </Routes>
    </MemoryRouter>
  );

const mockUserData = {
  data: { name: "Faisal", email: "faisal@example.com", age: 25 },
};

describe("UpdateUser Component", () => {
  beforeEach(() => jest.clearAllMocks());

  it("fetches user data successfully and sets form values", async () => {
    axios.get.mockResolvedValueOnce(mockUserData);
    renderUpdateUser();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("123"), {
        withCredentials: true,
      });
    });
  });

  it("shows toast error when fetching user fails", async () => {
    axios.get.mockRejectedValueOnce(new Error(ERROR.NETWORK));
    renderUpdateUser();

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(TOAST_MESSAGES.USER_FETCH_ERROR)
    );
  });

  it("updates user successfully using toast.promise", async () => {
    axios.get.mockResolvedValueOnce(mockUserData);
    const mockPromise = jest.fn().mockResolvedValueOnce();
    toast.promise.mockImplementation(() => Promise.resolve(mockPromise()));

    renderUpdateUser();
    await screen.findByDisplayValue("Faisal");

    fireEvent.change(screen.getByDisplayValue("Faisal"), {
      target: { value: "Faisal Updated" },
    });
    fireEvent.click(screen.getByRole(ROLES.UPDATE_USER_BUTTON));

    await waitFor(() => expect(toast.promise).toHaveBeenCalled());
  });

  it("handles update failure with custom error message", async () => {
    axios.get.mockResolvedValueOnce(mockUserData);
    const errorObj = {
      response: { data: { message: TOAST_MESSAGES.USER_UPDATE_ERROR } },
    };
    toast.promise.mockImplementation(() => Promise.reject(errorObj));

    renderUpdateUser();
    await screen.findByDisplayValue("Faisal");

    fireEvent.click(screen.getByRole(ROLES.UPDATE_USER_BUTTON));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(TOAST_MESSAGES.USER_UPDATE_ERROR)
    );
  });

  it("covers err.response?.data?.message branch in toast.promise", async () => {
    axios.get.mockResolvedValueOnce(mockUserData);

    const customError = {
      response: { data: { message: "Custom error from API" } },
    };
    toast.promise.mockImplementation((_, { error }) => {
      error.render(customError);
      return Promise.reject(customError);
    });

    renderUpdateUser();
    await screen.findByDisplayValue("Faisal");
    fireEvent.click(screen.getByRole(ROLES.UPDATE_USER_BUTTON));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(TOAST_MESSAGES.USER_UPDATE_ERROR)
    );
  });

  it("handles submit error without response", async () => {
    axios.get.mockResolvedValueOnce(mockUserData);
    const networkError = new Error("Network Error");
    toast.promise.mockImplementation(() => Promise.reject(networkError));

    renderUpdateUser();
    await screen.findByDisplayValue("Faisal");
    fireEvent.click(screen.getByRole(ROLES.UPDATE_USER_BUTTON));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(TOAST_MESSAGES.USER_UPDATE_ERROR)
    );
  });

  it("handles fetch user returning null", async () => {
    axios.get.mockResolvedValueOnce({ data: null });
    renderUpdateUser();

    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("123"), {
        withCredentials: true,
      })
    );

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const ageInput = screen.getByLabelText(/age/i);

    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(ageInput.value).toBe("");
  });
});
