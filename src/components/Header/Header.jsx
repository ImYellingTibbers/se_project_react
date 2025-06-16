import { Link } from "react-router-dom";
import { useContext } from "react";

import "./Header.css";
import logo from "../../assets/header-logo.svg";
import { currentDay } from "../../utils/constants";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  onAddClick,
  weatherData,
  ToggleSwitch,
  isLoggedIn,
  openLoginModal,
  openRegisterModal,
}) {
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

      {isLoggedIn ? (
        <>
          <button
            className="header__add-clothes-btn"
            type="button"
            onClick={onAddClick}
          >
            + Add Clothes
          </button>
          <Link className="header__link" to="/se_project_react/profile">
            <div className="header__user-container">
              <p className="header__user_name">{currentUser?.name}</p>
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
        </>
      ) : (
        <div className="header__auth-buttons">
          <button className="header__auth-btn" onClick={openRegisterModal}>
            Sign Up
          </button>
          <button className="header__auth-btn" onClick={openLoginModal}>
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
