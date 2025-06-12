import React, { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/currentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__info">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser?.name || "User Avatar"}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser?.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name || "Guest"}</p>
      </div>
      <button onClick={onEditProfile} className="sidebar__edit-button">
        Change profile data
      </button>
      <button onClick={onLogout} className="sidebar__logout-btn">
        Log out
      </button>
    </div>
  );
}

export default SideBar;
