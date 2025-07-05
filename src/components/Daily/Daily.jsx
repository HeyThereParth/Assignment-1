import React from "react";
import './Daily.css';

function Daily({ data, isCelsius }) {
  const formattedDate = new Date(data.date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  // Conditional temperature conversion
  const avgTemp = isCelsius
    ? Math.floor(data.avgTemp)
    : Math.floor((data.avgTemp * 9) / 5 + 32);

  const maxTemp = isCelsius
    ? Math.floor(data.maxTemp)
    : Math.floor((data.maxTemp * 9) / 5 + 32);

  const minTemp = isCelsius
    ? Math.floor(data.minTemp)
    : Math.floor((data.minTemp * 9) / 5 + 32);

  const unit = isCelsius ? "C" : "F";

  return (
    <li className="daily-forecast__item">
      <p className="day">{formattedDate}</p>
      <img src={data.icon} alt="weather icon" className="daily-icon" />
      <p className="temp">{avgTemp}°{unit}</p>
      <p className="min-max">H: {maxTemp}°{unit} / L: {minTemp}°{unit}</p>
      {/* <p className="desc">{data.description}</p> */}
    </li>
  );
}

export default Daily;


