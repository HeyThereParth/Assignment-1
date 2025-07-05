import React from "react";
import { render, screen } from "@testing-library/react";
import Daily from "./Daily";

const sampleData = {
  date: "2025-07-03",
};

test("renders the date", () => {
  render(<Daily data={sampleData} isCelsius={true}/>);
  expect(screen.getByText("Thu, 3 Jul")).toBeInTheDocument();
});
