import { useContext } from "react";

import CurrentUserContext from "../../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const userInitial = currentUser?.name?.[0] || "?";
  return (
    <div className="sidebar">
      {currentUser?.avatar ? (
        <img
          src={currentUser.avatar}
          alt="User avatar"
          className="sidebar__avatar"
        />
      ) : (
        <div className="sidebar__avatar sidebar__avatar--placeholder">
          {userInitial}
        </div>
      )}
      <p className="sidebar__username">{currentUser?.name || "Guest"}</p>
      <button className="sidebar__edit-btn" onClick={onEditProfile}>
        Edit Profile
      </button>
    </div>
  );
}

export default SideBar;
