import { render, screen } from "@testing-library/react";
import App from "../App";
import { ROLES } from "../constants/text-constants";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByRole(ROLES.APP);
  expect(linkElement).toBeInTheDocument();
});
