import './Hourly.css';

function Hourly({ data, isCelsius }) {
  const icon = data.condition.icon.replace("64x64", "128x128");
  const time = new Date(data.time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const temperature = isCelsius
    ? Math.floor(data.temp_c)
    : Math.floor((data.temp_c * 9) / 5 + 32);

  return (
    <li className="hourly-forecast__item">
      <p className="hourly-forecast__time">{time}</p>
      <img src={icon} alt={data.condition.text} />
      <p className="hourly-forecast__temperature">{temperature}°{isCelsius ? "C" : "F"}</p>
    </li>
  );
}

export default Hourly;
