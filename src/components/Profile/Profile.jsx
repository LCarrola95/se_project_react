import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ onCardClick, clothingItems }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection onCardClick={onCardClick} clothingItems={clothingItems} />
    </div>
  );
}

export default Profile;
