import "./Header.css"
import logo from "../../assets/header-logo.svg";
import avatar from "../../assets/user-avatar.png";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Site logo" />
      <p className="header__date-and-location">June 15, New York</p>
      <button className="header__add-clothes-btn">+ Add Clothes</button>
      <div className="header__user-container">
        <p className="header__user_name">Terrence Tegegne</p>
        <img className="header__user_avatar" src={avatar} alt="User avatar" />
      </div>
    </header>
  );
}

export default Header;
