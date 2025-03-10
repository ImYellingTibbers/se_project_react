import "./WeatherCard.css";
import sunnyDay from "../../../assets/sunny-day.png";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp[currentTemperatureUnit]}&deg; {currentTemperatureUnit}</p>
      <img src={sunnyDay} alt="Sunny day" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
