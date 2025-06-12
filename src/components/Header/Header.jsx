import "./Header.css";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/currentUserContext";
import logo from "../../assets/logo.svg";
import React, { useContext } from "react";

function Header({
  handleAddClick,
  weatherData,
  handleLoginClick,
  handleRegisterClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userInitial = currentUser?.name?.charAt(0).toUpperCase();

  return (
    <header className="header">
      <Link to="/">
        <img
          className="header__logo"
          src={logo}
          alt="WTWR (What to Wear?) logo"
        />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <p className="header__temperature">
        {weatherData.temp[weatherData.unit]}°{weatherData.unit}
      </p>
      <ToggleSwitch />
      <div className="header__button-container">
        {currentUser ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <div className="header__user-container">
              <Link to="/profile" className="header__profile-link">
                <p className="header__username">{currentUser?.name}</p>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {userInitial}
                  </div>
                )}
              </Link>
            </div>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button
              onClick={handleRegisterClick}
              className="header__signup-btn"
            >
              Sign Up
            </button>
            <button onClick={handleLoginClick} className="header__login-btn">
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
