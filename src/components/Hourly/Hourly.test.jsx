import React from "react";
import { render, screen } from "@testing-library/react";
import Hourly from "./Hourly";

const sampleData = {
  time: "2025-07-03 14:00",
  temp_c: 30,
  condition: {
    text: "Clear",
    icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
  },
};

test("displays temperature in Celsius with correct value", () => {
  render(<Hourly data={sampleData} isCelsius={true} />);
  expect(screen.getByText("30°C")).toBeInTheDocument();
});
