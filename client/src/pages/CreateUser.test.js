import React from "react";
import { render, screen } from "@testing-library/react";
import CreateUser from "./CreateUser";
import { MemoryRouter } from "react-router-dom";

describe("CreateUser Component", () => {
  it("should render the CreateUser in the document", () => {
    render(
      <MemoryRouter>
        <CreateUser />
      </MemoryRouter>
    );

    const spinner = screen.getByRole("create");

    expect(spinner).toBeInTheDocument();
  });
});
