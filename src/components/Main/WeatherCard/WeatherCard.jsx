import "./WeatherCard.css";
import sunnyDay from "../../../assets/sunny-day.png";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg; F</p>
      <img src={sunnyDay} alt="Sunny day" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
