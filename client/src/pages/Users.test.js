import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Users from "./Users";

describe("Users Component", () => {
  it("should render the Users component in the document", () => {
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    const usersContainer = screen.getByRole("users-container");

    expect(usersContainer).toBeInTheDocument();
  });
});
