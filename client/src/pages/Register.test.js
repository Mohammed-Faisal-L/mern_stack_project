import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";

describe("Register Component", () => {
  it("should render the Register in the document", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const spinner = screen.getByRole("register");

    expect(spinner).toBeInTheDocument();
  });
});
