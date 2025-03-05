import "./ModalWithForm.css";
import modalCloseX from "../../assets/modal-close-x.svg";

function ModalWithForm({ children, buttonText, title, activeModal, closeModal }) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close-btn" type="button" onClick={closeModal}>
          <img src={modalCloseX} alt="X" />
        </button>
        <form action="" className="modal__form">
            {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
