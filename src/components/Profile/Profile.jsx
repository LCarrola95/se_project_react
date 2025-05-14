import React, { useContext } from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import CurrentUserContext from "../../contexts/currentUserContext";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  onEditProfile,
  onLogout,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <SideBar handleAddClick={handleAddClick} />
      <div className="profile__header">
        <h1 className="profile__title">Your Profile</h1>
        <button onClick={onEditProfile} className="profile__edit-button">
          Edit Profile
        </button>
      </div>
      <div className="profile__content">
        <div className="profile__user-info">
          <img
            src={currentUser?.avatar}
            alt={`${currentUser?.name}'s avatar`}
            className="profile__avatar"
          />
          <h2 className="profile__username">{currentUser?.name}</h2>
        </div>
        <button onClick={onLogout} className="profile__logout-btn">
          Sign out
        </button>
        <ClothesSection
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
        />
      </div>
    </div>
  );
}

export default Profile;
