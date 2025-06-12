import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ onCardClick, clothingItems, onEditProfile, onLogout }) {
  return (
    <div className="profile">
      <SideBar onEditProfile={onEditProfile} onLogout={onLogout} />
      <div className="profile__header"></div>
      <div className="profile__content">
        <div className="profile__user-info"></div>
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
        />
      </div>
    </div>
  );
}

export default Profile;
