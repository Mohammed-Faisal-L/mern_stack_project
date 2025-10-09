import { render, screen } from "@testing-library/react";
import Loading from "../common/Loading";
import { ROLES } from "../constants/text-constants";

describe("Loading Component", () => {
  it("should render the loading spinner in the document", () => {
    render(<Loading />);

    const spinner = screen.getByRole(ROLES.STATUS);

    expect(spinner).toBeInTheDocument();
  });
});
