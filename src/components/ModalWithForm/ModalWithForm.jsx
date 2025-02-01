import "./ModalWithForm.css";
import closeButton from "../../assets/close-button.svg";
import { useEffect } from "react";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) {
  useEffect(() => {
    if (!isOpen) {
      const form = document.querySelector(".modal__form");
      if (form) {
        form.reset();
      }
    }
  }, [isOpen]);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_input">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          disabled={isLoading}
        >
          <img
            src={closeButton}
            alt="close button"
            className="modal__close-icon"
          />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit" disabled={isLoading}>
            {isLoading ? "Saving..." : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
