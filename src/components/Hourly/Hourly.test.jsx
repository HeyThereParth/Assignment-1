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

describe("Hourly Component", () => {
  test("displays temperature in Celsius", () => {
    render(<Hourly data={sampleData} isCelsius={true} />);
    expect(screen.getByText("30°C")).toBeInTheDocument();
  });

  test("displays the time in 24-hour format", () => {
    render(<Hourly data={sampleData} isCelsius={true} />);
    expect(screen.getByText("14:00")).toBeInTheDocument();
  });

  test("displays the weather icon and alt text", () => {
    render(<Hourly data={sampleData} isCelsius={true} />);
    const icon = screen.getByAltText("Clear");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", expect.stringContaining("128x128"));
  });

  test("displays temperature in Fahrenheit when isCelsius is false", () => {
    render(<Hourly data={sampleData} isCelsius={false} />);
    const expectedFahrenheit = Math.floor((30 * 9) / 5 + 32); // 86°F
    expect(screen.getByText(`${expectedFahrenheit}°F`)).toBeInTheDocument();
  });
});
