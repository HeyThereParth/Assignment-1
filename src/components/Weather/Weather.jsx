import "./Weather.css";

function Weather({ currentWeather, isCelsius }) {
  const temperature = isCelsius
    ? Math.floor(currentWeather.temperature)
    : Math.floor((currentWeather.temperature * 9) / 5 + 32);

  const unit = isCelsius ? "C" : "F";

  return (
    <div className="weather-section">
      <div className="weather-section__current">
        <img
          src={`https:${currentWeather.icon}`}
          alt="weather icon"
          className="weather-section__icon"
        />
        <h2 className="weather-section__temperature">
          {temperature}
          <span>°{unit}</span>
        </h2>
        <p className="weather-section__description">
          {currentWeather.description}
        </p>
      </div>
    </div>
  );
}

export default Weather;

