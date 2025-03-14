import { Link } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/header-logo.svg";
import avatar from "../../assets/user-avatar.png";
import { currentDay } from "../../utils/constants";

function Header({ onAddClick, weatherData, ToggleSwitch }) {
  return (
    <header className="header">
      <Link to="/"></Link>
      <Link to="/profile"></Link>
      <Link to="/se_project_react/">
        <img className="header__logo" src={logo} alt="Site logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDay}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        className="header__add-clothes-btn"
        type="button"
        onClick={onAddClick}
      >
        + Add Clothes
      </button>
      <Link className="header__link" to="/se_project_react/profile">
        <div className="header__user-container">
          <p className="header__user_name">Terrence Tegegne</p>
          <img className="header__user_avatar" src={avatar} alt="User avatar" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
