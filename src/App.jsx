import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HourlyPage from "./pages/HourlyPage";
import DailyPage from "./pages/DailyPage";
import Weather from "./components/Weather/Weather";
import NoResultDiv from "./components/NoResult/NoResultDiv";


function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [daysForecast, setDaysForecast] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const searchInputRef = useRef(null);
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
  };

  const filterHourly = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;
    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });
    setHourlyForecast(next24HoursData);
  };

  const filterBydays = (daysData) => {
    const formattedDays = daysData.map((day) => ({
      date: day.date,
      avgTemp: Math.round(day.day.avgtemp_c),
      minTemp: Math.round(day.day.mintemp_c),
      maxTemp: Math.round(day.day.maxtemp_c),
      icon: day.day.condition.icon.replace("64x64", "128x128"),
      description: day.day.condition.text,
    }));
    setDaysForecast(formattedDays);
  };

  const getWeatherDetail = async (API_URL) => {
    setNoResult(false);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error();
      const data = await response.json();
      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const icon = data.current.condition.icon.replace("64x64", "128x128");
      setCurrentWeather({ temperature, description, icon });

      const combinedHourlyData = [
        ...data.forecast.forecastday[0].hour,
        ...data.forecast.forecastday[1].hour,
      ];
      searchInputRef.current.value = data.location.name;
      filterHourly(combinedHourlyData);
      filterBydays(data.forecast.forecastday);
    } catch {
      setNoResult(true);
    }
  };

  useEffect(() => {
    const defaultCity = "Mumbai";
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=5`;
    getWeatherDetail(API_URL);
  }, []);

  return (
    <div className="container">
      <Header
        getWeatherDetail={getWeatherDetail}
        searchInputRef={searchInputRef}
        toggleTemperatureUnit={toggleTemperatureUnit}
        isCelsius={isCelsius}
      />
      {noResult ? (
        <NoResultDiv />
      ) : (
        <>
          <Weather currentWeather={currentWeather} isCelsius={isCelsius} />
          <Routes>
            <Route
              path="/hourly"
              element={
                <HourlyPage
                  hourlyForecast={hourlyForecast}
                  isCelsius={isCelsius}
                />
              }
            />
            <Route
              path="/days"
              element={
                <DailyPage daysForecast={daysForecast} isCelsius={isCelsius} />
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
