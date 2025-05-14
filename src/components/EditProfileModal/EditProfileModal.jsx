import React, { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/currentUserContext";
import "./EditProfileModal.css";
import closeButton from "../../assets/close-icon-white.svg";

function EditProfileModal({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeButton} alt="close" className="modal__close-icon" />
        </button>
        <h2 className="modal__title">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="modal__form">
          <label className="modal__label">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="modal__input"
              placeholder="Enter your name"
              required
            />
          </label>
          <label className="modal__label">
            Avatar URL
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="modal__input"
              placeholder="Enter avatar URL"
              required
            />
          </label>
          <button
            type="submit"
            className={`modal__save-button ${
              isLoading && "modal__save-button_disabled"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
