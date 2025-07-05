import Hourly from "../components/Hourly/Hourly";

function HourlyPage({ hourlyForecast, isCelsius }) {
  return (
    <div className="hourly-forecast">
      <ul className="weather-list">
        {hourlyForecast.map((hour) => (
          <Hourly key={hour.time_epoch} data={hour} isCelsius={isCelsius} />
        ))}
      </ul>
    </div>
  );
}

export default HourlyPage;
