import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/currentUserContext";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleAddClick, clothingItems, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-button"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__cards">
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))
        ) : (
          <p>No clothing items added by you.</p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
