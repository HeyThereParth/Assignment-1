import { useSelector } from "react-redux";
import Hourly from "../components/Hourly/Hourly";

function HourlyPage() {
  const { hourly, isCelsius, loading, error } = useSelector((state) => state.weather);

  if (loading || error || hourly.length === 0) return null;

  return (
    <div className="hourly-forecast">
      <ul className="weather-list">
        {hourly.map((hour) => (
          <Hourly key={hour.time_epoch} data={hour} isCelsius={isCelsius} />
        ))}
      </ul>
    </div>
  );
}

export default HourlyPage;
