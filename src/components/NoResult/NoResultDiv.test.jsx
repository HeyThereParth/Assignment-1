import React from "react";
import { render, screen } from "@testing-library/react";
import NoResultDiv from "./NoResultDiv";

test("renders error message and icon", () => {
  render(<NoResultDiv />);
  expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  expect(screen.getByAltText("No result found")).toBeInTheDocument();
});
