import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "../components/Loading";

describe("Loading Component", () => {
  it("should render the loading spinner in the document", () => {
    render(<Loading />);

    const spinner = screen.getByRole("status");

    expect(spinner).toBeInTheDocument();
  });
});
