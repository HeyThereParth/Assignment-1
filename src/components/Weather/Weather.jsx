import "./Weather.css";
import { useSelector } from "react-redux";

function Weather() {
  const { current, isCelsius } = useSelector((state) => state.weather);

  if (!current.temperature) return null; // Prevents rendering on initial load

  const temperature = isCelsius
    ? Math.floor(current.temperature)
    : Math.floor((current.temperature * 9) / 5 + 32);

  const unit = isCelsius ? "C" : "F";

  return (
    <div className="weather-section">
      <div className="weather-section__current">
        <img
          src={`https:${current.icon}`}
          alt="weather icon"
          className="weather-section__icon"
        />
        <h2 className="weather-section__temperature">
          {temperature}
          <span>°{unit}</span>
        </h2>
        <p className="weather-section__description">{current.description}</p>
      </div>
    </div>
  );
}

export default Weather;
