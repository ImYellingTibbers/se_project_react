import "./WeatherCard.css";
import sunnyDay from "../../../assets/sunny-day.png";

function WeatherCard() {
  return (
    <section className="weather-card">
        <p className="weather-card__temp">75&deg;</p>
        <img src={sunnyDay} alt="Sunny day" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
