import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchWeather } from "./features/weather/weatherslice";
import Header from "./components/Header/Header";
import Weather from "./components/Weather/Weather";
import HourlyPage from "./pages/HourlyPage";
import DailyPage from "./pages/DailyPage";
import NoResultDiv from "./components/NoResult/NoResultDiv";

function App() {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather("Mumbai"));
  }, [dispatch]);

  return (
    <div className="container">
      <Header />
      {loading && <p>Loading...</p>}
      {error && <NoResultDiv message={error} />}
      {!loading && !error && (
        <>
          <Weather />
          <Routes>
            <Route path="/hourly" element={<HourlyPage />} />
            <Route path="/days" element={<DailyPage />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
