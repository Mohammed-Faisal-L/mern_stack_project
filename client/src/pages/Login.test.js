import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

describe("Login Component", () => {
  it("should render the Login in the document", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const spinner = screen.getByRole("login");

    expect(spinner).toBeInTheDocument();
  });
});
