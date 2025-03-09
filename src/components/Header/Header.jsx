import "./Header.css";
import logo from "../../assets/header-logo.svg";
import avatar from "../../assets/user-avatar.png";
import { currentDay } from "../../utils/constants";

function Header({ handleAddClick, weatherData, ToggleSwitch }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Site logo" />
      <p className="header__date-and-location">
        {currentDay}, {weatherData.city}
      </p>
      <ToggleSwitch
        className="header__temperature-toggle-btn"
        onColor="#06D6A0"
      />
      <button
        className="header__add-clothes-btn"
        type="button"
        onClick={handleAddClick}
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__user_name">Terrence Tegegne</p>
        <img className="header__user_avatar" src={avatar} alt="User avatar" />
      </div>
    </header>
  );
}

export default Header;
