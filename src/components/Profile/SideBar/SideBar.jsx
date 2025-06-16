import { useContext } from "react";

import CurrentUserContext from "../../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <img
          src={currentUser?.avatar || ""}
          alt="User avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </div>
      <button className="sidebar__link" onClick={onEditProfile}>
        Change profile data
      </button>
      <button className="sidebar__link" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
