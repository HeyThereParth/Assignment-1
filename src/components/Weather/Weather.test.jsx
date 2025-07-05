import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Weather from "./Weather";

const sampleCurrentWeather = {
  icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
  temperature: 28,
  description: "Partly cloudy",
};

test("renders the weather description", () => {
  render(<Weather currentWeather={sampleCurrentWeather} isCelsius={true} />);
  expect(screen.getByText("Partly cloudy")).toBeInTheDocument();
});

test("renders the temperature", () => {
  render(<Weather currentWeather={sampleCurrentWeather} isCelsius={true}/>);
  expect(screen.getByText("28")).toBeInTheDocument();
});

