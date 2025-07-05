import "./Header.css";
import { NavLink } from "react-router-dom";

function Header({ getWeatherDetail, searchInputRef, toggleTemperatureUnit, isCelsius }) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  

  const handleCitySearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.querySelector(".header__input");
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=5`;
    getWeatherDetail(API_URL);
  };
// const isCelsius = false;
  const handleLocationSearch = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(position);
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=5`;
        getWeatherDetail(API_URL);
      },
      () => {
        alert("Location access denied. Please enable permissions to use this feature.");
        
      }
    );
  };

  return (
    <div className="header">
      <div className="header__search-section">
        <form action="#" className="header__form" onSubmit={handleCitySearch}>
          <span className="header__icon material-symbols-rounded">search</span>
          <input
            type="text"
            placeholder="Enter a city name"
            ref={searchInputRef}
            className="header__input"
            required
          />
        </form>
        <button className="header__button-1" id="temerature-toggle">
          <span
            className="header__toggle-unit"
            // id="location"
            onClick={toggleTemperatureUnit}
          >
           {isCelsius ? "°F" : "°C"}
          </span>
        </button>
        <button className="header__button">
          <span
            className="header__icon material-symbols-rounded"
            id="location"
            onClick={handleLocationSearch}
          >
            distance
          </span>
        </button>
      </div>

      <nav className="navigation">
        <NavLink to="/" className="navigation__link">Home</NavLink>
        <NavLink to="/hourly" className="navigation__link">24-Hour Forecast</NavLink>
        <NavLink to="/days" className="navigation__link">5-Day Forecast</NavLink>
      </nav>
    </div>
  );
}

export default Header;
