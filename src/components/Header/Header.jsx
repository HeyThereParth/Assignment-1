import "./Header.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, toggleUnit, setSearchTerm, } from "../../features/weather/weatherslice";
import { useEffect } from "react";

function Header() {
  const dispatch = useDispatch();
  const isCelsius = useSelector((state) => state.weather.isCelsius);
  const searchTerm = useSelector((state) => state.weather.searchTerm);



  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm.trim()) {
        dispatch(fetchWeather(searchTerm.trim()));
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchTerm, dispatch]);

  
  const handleLocationSearch = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(fetchWeather(`${latitude},${longitude}`));
      },
      () => {
        alert("Location access denied. Please enable permissions.");
      }
    );
  };

  return (
    <div className="header">
      <div className="header__search-section">
        <form onSubmit={(e) => e.preventDefault()} className="header__form">
          <span className="header__icon material-symbols-rounded">search</span>
          <input
            type="text"
            placeholder="Enter a city name"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="header__input"
          />
        </form>

        <button className="header__button-1" onClick={() => dispatch(toggleUnit())}>
          <span className="header__toggle-unit">{isCelsius ? "°F" : "°C"}</span>
        </button>

        <button className="header__button" onClick={handleLocationSearch}>
          <span className="header__icon material-symbols-rounded" id="location">distance</span>
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
