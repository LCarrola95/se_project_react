import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  isOpen,
  onClose,
  onLogin,
  isLoading,
  onSwitchToRegister,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setIsValid(false);
  }, [isOpen]);

  useEffect(() => {
    const emailIsValid = email.includes("@") && email.length > 5;
    const passwordIsValid = password.length >= 6;
    setIsValid(emailIsValid && passwordIsValid);
  }, [email, password]);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    onLogin(userData);
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isValid}
      type="login"
      buttonType="modal__submit_type_login-register"
    >
      <label className="modal__label">
        Email<span className="modal__required">*</span>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="modal__input modal__input_type_login"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label className="modal__label">
        Password<span className="modal__required">*</span>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="modal__input modal__input_type_login"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>

      <div className="modal__switch">
        <button
          type="button"
          className="modal__switch-button"
          onClick={onSwitchToRegister}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
