import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UpdateUser from "./UpdateUser";

describe("Loading Component", () => {
  it("should render the UpdateUser in the document", () => {
    render(
      <MemoryRouter>
        <UpdateUser />
      </MemoryRouter>
    );

    const spinner = screen.getByRole("update");

    expect(spinner).toBeInTheDocument();
  });
});
