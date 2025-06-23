import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  onEditProfile,
  onLogout,
  onCardLike,
  handleAddClick,
}) {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <SideBar onEditProfile={onEditProfile} onLogout={onLogout} />
      </div>
      <div className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onCardLike={onCardLike}
          handleAddClick={handleAddClick}
        />
      </div>
    </div>
  );
}

export default Profile;
