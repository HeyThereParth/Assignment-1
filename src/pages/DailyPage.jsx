import { useSelector } from "react-redux";
import Daily from "../components/Daily/Daily";

function DailyPage() {
  const { daily, isCelsius, loading, error } = useSelector((state) => state.weather);

  if (loading || error || daily.length === 0) return null;

  return (
    <div className="daily-forecast">
      <ul className="daily-list">
        {daily.map((day) => (
          <Daily key={day.date} data={day} isCelsius={isCelsius} />
        ))}
      </ul>
    </div>
  );
}

export default DailyPage;
