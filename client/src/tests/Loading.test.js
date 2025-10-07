import { render, screen } from "@testing-library/react";
import Loading from "../common/Loading";

describe("Loading Component", () => {
  it("should render the loading spinner in the document", () => {
    render(<Loading />);

    const spinner = screen.getByRole("status");

    expect(spinner).toBeInTheDocument();
  });
});
