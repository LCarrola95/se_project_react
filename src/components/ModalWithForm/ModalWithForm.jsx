import "./ModalWithForm.css";
import closeButton from "../../assets/close-button.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  isValid,
  type = "default",
  buttonType,
}) {
  return (
    <div className={`modal modal_type_${type} ${isOpen ? "modal_opened" : ""}`}>
      <div
        className={`modal__content modal__content_type_input modal__content_type_${type}`}
      >
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
          <button
            type="submit"
            className={`modal__submit ${buttonType} ${
              isValid ? "modal__submit_valid" : ""
            }`}
            disabled={!isValid || isLoading}
          >
            {isLoading ? "Saving..." : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
