import "./ItemCard.css";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/currentUserContext";
import heartIcon from "../../assets/like-button.png";
import heartIconActive from "../../assets/like-button-active.png";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {currentUser && (
        <button className="item-card__like-button" onClick={handleLike}>
          <img
            src={isLiked ? heartIconActive : heartIcon}
            alt={isLiked ? "Liked" : "Like"}
            className={`like-icon ${isLiked ? "liked" : ""}`}
          />
        </button>
      )}
    </li>
  );
}

export default ItemCard;
