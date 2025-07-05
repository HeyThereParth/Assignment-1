import Daily from "../components/Daily/Daily";

function DailyPage({ daysForecast, isCelsius }) {
  return (
    <div className="daily-forecast">
      <ul className="daily-list">
        {daysForecast.map((day) => (
          <Daily key={day.date} data={day} isCelsius={isCelsius} />
        ))}
      </ul>
    </div>
  );
}

export default DailyPage;
