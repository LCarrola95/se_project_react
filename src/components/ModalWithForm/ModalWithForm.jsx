import "./ModalWithForm.css";
import closeButton from "../../assets/close-button.svg";
import { useState } from "react";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
}) {
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFormChange = (e) => {
    const form = e.target.form;
    const radioButtons = form.querySelectorAll('input[type="radio"]');
    const radioSelected = Array.from(radioButtons).some(
      (radio) => radio.checked
    );

    const formErrors = {};
    const nameInput = form.querySelector("#name");
    const imageInput = form.querySelector("#imageUrl");

    if (nameInput && nameInput.validationMessage) {
      formErrors.name = nameInput.validationMessage;
    }
    if (imageInput && imageInput.validationMessage) {
      formErrors.imageUrl = imageInput.validationMessage;
    }

    setErrors(formErrors);
    setIsValid(form.checkValidity() && radioSelected);
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_input">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={closeButton}
            alt="close button"
            className="modal__close-icon"
          />
        </button>
        <form
          onSubmit={onSubmit}
          onChange={handleFormChange}
          className="modal__form"
        >
          {typeof children === "function" ? children(errors) : children}
          <button
            type="submit"
            className={`modal__submit ${isValid ? "modal__submit_valid" : ""}`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
