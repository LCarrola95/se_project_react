import "./DeleteConfirmationModal.css";
import closeButton from "../../assets/close-button.svg";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_confirm">
        <button type="button" onClick={onClose} className="modal__close">
          <img
            src={closeButton}
            alt="close button"
            className="modal__close-icon"
          />
        </button>
        <div className="modal__confirm-content">
          <p className="modal__confirm-message">
            Are you sure you want to delete this item?
            <br />
            This action is irreversible.
          </p>
          <div className="modal__confirm-buttons">
            <button
              type="button"
              onClick={onConfirm}
              className="modal__confirm-button modal__confirm-button_type_delete"
            >
              Yes, delete item
            </button>
            <button
              type="button"
              onClick={onClose}
              className="modal__confirm-button modal__confirm-button_type_cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
