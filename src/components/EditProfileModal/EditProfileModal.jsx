import React, { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/currentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setName(currentUser?.name || "");
    setAvatar(currentUser?.avatar || "");
    setIsValid(false);
  }, [isOpen, currentUser]);

  useEffect(() => {
    const nameIsValid = name.length > 0;
    const avatarIsValid = avatar.length > 0;
    setIsValid(nameIsValid && avatarIsValid);
  }, [name, avatar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isValid}
      type="edit"
      buttonType="modal__submit_type_edit"
    >
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
    </ModalWithForm>
  );
}

export default EditProfileModal;
