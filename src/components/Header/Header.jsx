import { Link } from "react-router-dom";
import { useContext } from "react";

import "./Header.css";
import logo from "../../assets/header-logo.svg";
import avatar from "../../assets/user-avatar.png";
import { currentDay } from "../../utils/constants";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ onAddClick, weatherData, ToggleSwitch }) {
  const currentUser = useContext(CurrentUserContext);
  const userInitial = currentUser?.name?.[0] || "?";

  return (
    <header className="header">
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
          <p className="header__user_name">{currentUser?.name || "Guest"}</p>
          {currentUser?.avatar ? (
            <img
              className="header__user_avatar"
              src={currentUser.avatar}
              alt="User avatar"
            />
          ) : (
            <div className="header__user_avatar header__user_avatar--placeholder">
              {userInitial}
            </div>
          )}
        </div>
      </Link>
    </header>
  );
}

export default Header;
