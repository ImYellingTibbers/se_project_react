import { useEffect } from "react";

import "../ModalWithForm/ModalWithForm.css";
import "./ItemModal.css";
import modalCloseX from "../../assets/modal-close-x-white.svg";

function ItemModal({ card, closeModal, isOpen, onCardDelete }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal();
    }
  };

  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content modal__content_type_image">
        <button className="modal__close-btn" type="button" onClick={closeModal}>
          <img src={modalCloseX} alt="Close" />
        </button>
        <img src={card.imageUrl} alt="Card image" className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer_container">
            <h2 className="modal__caption">{card.name}</h2>
            <button
              className="modal__delete-btn"
              onClick={() => onCardDelete(card._id)}
            >
              Delete item
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
