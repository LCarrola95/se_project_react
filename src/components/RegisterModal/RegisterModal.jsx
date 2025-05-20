import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  isLoading,
  onSwitchToLogin,
}) {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setIsValid(
      formData.name && formData.avatar && formData.email && formData.password
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isValid}
      type="register"
      buttonType="modal__submit_type_login-register"
    >
      <label className="modal__label">
        Email<span className="modal__required">*</span>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="modal__input modal__input_type_register"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Password<span className="modal__required">*</span>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="modal__input modal__input_type_register"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Name<span className="modal__required">*</span>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="modal__input modal__input_type_register"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL<span className="modal__required">*</span>
        <input
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          className="modal__input modal__input_type_register"
          value={formData.avatar}
          onChange={handleChange}
          required
        />
      </label>
      <div className="modal__switch">
        <button
          type="button"
          className="modal__switch-button"
          onClick={onSwitchToLogin}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
