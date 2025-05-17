import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onLogin, isLoading }) {
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
      title="Sign In"
      buttonText="Login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isValid}
    >
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
    </ModalWithForm>
  );
}

export default LoginModal;
